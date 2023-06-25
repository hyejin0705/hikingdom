export function searchAsset(arr: any[], filter?: string) {
  const n = arr.length

  const uniqueNameList = new Set() // 중복된 name 값을 제거하기 위한 Set 객체

  arr[0].check = false
  uniqueNameList.add('전체')

  if (n > 1) {
    for (let i = 1; i < n; i++) {
      arr[i].check = filter && filter === arr[i].mountainName

      uniqueNameList.add(arr[i].mountainName)
    }
    return { arr, uniqueNameList: Array.from(uniqueNameList) }
  }

  return { arr, uniqueNameList: Array.from(uniqueNameList) }
}
