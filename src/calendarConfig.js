export const CALENDAR_IDS = [
  'anagarciachavez678@gmail.com', // replace with your actual main calendar email if different
  'c_eeb6fcfcfb8073d2e36f9af345ad979f5a37ac316a4abddb2075e5547650a663@group.calendar.google.com', // archery
  'c_9d31a6f11b7161a52a34e088433abefa6d28f52289aac23c6744e66fcb3aebb4@group.calendar.google.com', // ling
  'c_d706c6a0a4e7c419b30328c8a4423fcdb3cb7a1aaa1af242654fedb972c19086@group.calendar.google.com', // cs 162
  'c_57057415ef4ff7b34248f4a254d33b32ce2c912266064fe5452d69c39a0b5e27@group.calendar.google.com', // GE
  'c_a131f83d88d0317bdd03c6585195d13b1d529ee4b90f3ed0aec8f89bcaafe54a@group.calendar.google.com', // work
  'c_d27459bbf365020568451ad6ab05ec738a9c3bb72b22f6e67a9dc3319e40a4e5@group.calendar.google.com', // ECE
  'c_186979a55d98f9cffd28dcbb066dcebb6eda799ef2abb65be61b1608bde12e10@group.calendar.google.com', // study
  'c_8eec5fc16c37ea35f037af80211a2f3a3025e68e104ce7b7cc9c56b2b21dafe0@group.calendar.google.com', // gym
  'c_8342f0fa275a6b478878efaf6776f4af426a38bf763488bb45b2155e327ec132@group.calendar.google.com', // misc events
  'c_8446f5c55e3c397f87a481d9345178d124e59bab4bedcaf85eb142c4aea99258@group.calendar.google.com', // class extra
  'c_31874d2334f290df8d5645ec6e825002651b03657a7bc99a53fa45ee1a2d5cdc@group.calendar.google.com', // class extra
  'c_e5124cacae751ea62a48d79262dad8c5007e26017aad5582ce70a340cb0a51c5@group.calendar.google.com', // meals
  'c_3984d12a4a470487ca02077e350f6e5942a6ee81dd257eb47a71bf3406aa72e4@group.calendar.google.com', // extra class
];

export function buildCalendarUrl(mode) {
  const base = 'https://calendar.google.com/calendar/embed?ctz=America%2FLos_Angeles';
  const params = `&mode=${mode}&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=1&showTz=0`;
  const srcParams = CALENDAR_IDS.map(id => `&src=${encodeURIComponent(id)}`).join('');
  return `${base}${params}${srcParams}`;
}