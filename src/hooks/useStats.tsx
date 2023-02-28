enum StatType {
  "Location",
  "Node"
 }

type StatValue = string | number

export type Stat = {
  type: StatType
  value: StatValue
  label: string
  icon: string
 }

export type Stats = Stat[]

export const useStats = () => {
  const getContinentStats = (continentId: string) => {
  }

  const getCountryStats = (countryId: string) => {
  }

  const getLocationStats = (locationId: string) => {
  }

  const getNodeStats = (nodeId: string) => {
  }

  return {
    getContinentStats,
    getCountryStats,
    getLocationStats,
    getNodeStats
  }
}