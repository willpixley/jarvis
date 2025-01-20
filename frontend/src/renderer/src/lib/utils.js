export function formatTime(dateString) {
  // Create a Date object from the string
  const date = new Date(dateString)

  // Extract hours and minutes
  let hours = date.getHours() // 0-23
  const minutes = String(date.getMinutes()).padStart(2, '0') // Add leading zero if needed

  // Determine AM/PM and adjust hours for 12-hour format
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12 || 12 // Convert 0 to 12 for midnight

  // Return formatted time
  return `${hours}:${minutes} ${ampm}`
}
