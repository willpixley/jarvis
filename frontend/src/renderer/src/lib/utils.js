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

export function formatDate(dateString) {
  const date = new Date(dateString + 'T12:00:00-06:00')

  const options = { weekday: 'short', month: 'short', day: 'numeric' } // Use 'short' for abbreviations
  const formattedDate = date.toLocaleDateString('en-US', options)

  // Add the ordinal suffix to the day
  const day = date.getDate()
  const ordinal =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th'

  return formattedDate.replace(day.toString(), `${day}`)
}
