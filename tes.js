mainDateRange = ['01-01-2020', '14-06-2020'];

selectedRanges = [
  ['03-01-2020', '04-01-2020'],
  ['03-01-2020', '05-01-2020'], //overlapping dates
  ['11-01-2020', '13-01-2020'],
  ['01-02-2020', '20-02-2020'],
  ['15-03-2020', '18-03-2020'],
  ['06-01-2020', '06-01-2020'], //date ranges will not be ordered
  ['03-01-2020', '04-01-2020']
]; //dates that the member has work assigned

function gapFinder(mainDateRange, selectedRanges) {
  const dateToInt = a => new Date(a.split('-').reverse().join('-'))
  const intToDate = a => new Date(a).toISOString().slice(0, 10).split('-').reverse().join('-')

  // convert to numbers
  selectedRanges = selectedRanges.map(r => r.map(dateToInt))


  // presort ranges
  selectedRanges.sort(([a, ], [b, ]) => a - b);
console.log(selectedRanges)

  let [min, max] = mainDateRange.map(dateToInt)
  const res = []
  for (const [x, y] of selectedRanges) {
    if (min > max) break
    if (min < x)
      res.push([min, x.setDate(x.getDate() - 1)])
    min = Math.max(min, y.setDate(y.getDate() + 1))
  }
  if (min <= max) res.push([min, max])

  return res.map(r => r.map(intToDate))
}
gapFinder(mainDateRange,selectedRanges)
