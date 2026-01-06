export const timeGreetings = [
  { start: 0, end: 4, messages: [
    "Still awake",
    "Late night session",
    "Working past midnight"
  ]},
  { start: 4, end: 12, messages: [
    "Good morning",
    "Morning check-in",
    "New day, fresh focus"
  ]},
  { start: 12, end: 17, messages: [
    "Good afternoon",
    "Midday check-in",
    "Focus hours"
  ]},
  { start: 17, end: 21, messages: [
    "Good evening",
    "Evening review",
    "Wrapping up the day"
  ]},
  { start: 21, end: 24, messages: [
    "Late evening",
    "Quiet hours",
    "Night check-in"
  ]},
];
export const timeSupportTexts = [
  { start: 0, end: 4, messages: [
    "Keep this session short and intentional",
    "Good time for planning, not heavy work",
    "If you're tired, stop — progress needs rest"
  ]},
  { start: 4, end: 12, messages: [
    "Review today’s top priority",
    "Start with the smallest actionable task",
    "Momentum is built early"
  ]},
  { start: 12, end: 17, messages: [
    "This is a good window for deep work",
    "Focus on one task until it's done",
    "Avoid switching — finish something"
  ]},
  { start: 17, end: 21, messages: [
    "Wrap up unfinished tasks",
    "Review what you completed today",
    "Prepare tomorrow’s first task"
  ]},
  { start: 21, end: 24, messages: [
    "Light work only — don’t overload yourself",
    "Plan tomorrow instead of pushing now",
    "Rest is part of progress"
  ]},
];
export const getRandomGreeting= ()=>{
   const hour = new Date().getHours();
   console.log(hour);
   
  const currentGreeting = timeGreetings.find(greeting => hour >= greeting.start && hour < greeting.end);
  const currentSupportText = timeSupportTexts.find(greeting => hour >= greeting.start && hour < greeting.end);

  if (!currentGreeting||!currentSupportText) return {greeting:"Hello!",supportText:"Time to conquer the day!"}
  const current = currentGreeting;
  
  return {greeting:current.messages[Math.floor(Math.random() * current.messages.length)], supportText:currentSupportText.messages[Math.floor(Math.random() * currentSupportText.messages.length)]}
  }
  function toRoute(text:string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")   
    .replace(/\s+/g, "-")           
    .replace(/-+/g, "-")           
    .replace(/^-|-$/g, "");        
}
