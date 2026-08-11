const express = require('express');
const router = express.Router();
const multer = require('multer');
const Anthropic = require('@anthropic-ai/sdk');

const upload = multer({ storage: multer.memoryStorage() });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const EXTRACTION_PROMPT = `You are extracting structured data from a course syllabus. Return ONLY valid JSON, no markdown formatting, no explanation, in exactly this shape:

{
  "professorEmail": "string or null if not found",
  "className": "string or null if not found",
  "assignments": [
    { "title": "string", "dueDate": "YYYY-MM-DD or null if unclear" }
  ]
}

Extract every assignment, exam, quiz, project, or deadline mentioned with a date. If a date is ambiguous or missing a year, assume the current academic year. If you cannot find something, use null for that field.`;

router.post('/parse', upload.single('file'), async (req, res) => {
  try {
    let contentBlocks = [{ type: 'text', text: EXTRACTION_PROMPT }];

    if (req.file) {
      const base64Data = req.file.buffer.toString('base64');
      if (req.file.mimetype === 'application/pdf') {
        contentBlocks.push({
          type: 'document',
          source: { type: 'base64', media_type: 'application/pdf', data: base64Data }
        });
      } else if (req.file.mimetype.startsWith('image/')) {
        contentBlocks.push({
          type: 'image',
          source: { type: 'base64', media_type: req.file.mimetype, data: base64Data }
        });
      }
    } else if (req.body.text) {
      contentBlocks.push({ type: 'text', text: `Syllabus text:\n\n${req.body.text}` });
    } else {
      return res.status(400).json({ error: 'No file or text provided' });
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: contentBlocks }]
    });

    const rawText = message.content.find(b => b.type === 'text')?.text || '';
    const cleaned = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    res.json(parsed);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to parse syllabus' });
  }
});

module.exports = router;