export const getNickname = (name?: string): string => {
  return name?.substring(0,2).toUpperCase() ?? ""
}