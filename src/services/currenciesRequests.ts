import axiosApi from "./axios";

export function getCurrenciesNames () {
    return axiosApi.get("/currencies.json")
}

export function getExchangeRate (initialValueKey:string,finalValueKey:string) {
    return axiosApi.get(`/currencies/${initialValueKey}/${finalValueKey}.json`)
}