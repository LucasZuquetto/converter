import { useQuery } from "react-query";
import { getCurrenciesNames } from "../services/currenciesRequests";

export default function useGetCurrenciesNames(setIsChanging: any) {
   return useQuery(
      "currenciesNames",
      () =>
         getCurrenciesNames().then((data) => {
            const currenciesKeys: string[] = Object.keys(data.data);
            const currenciesValues: string[] = Object.values(data.data);
            const formattedCurrencies = currenciesKeys.map((c, index) => {
               return {
                  key: currenciesKeys[index],
                  name: currenciesValues[index],
               };
            });
            return formattedCurrencies;
         }),
      {
         onSuccess: () => {
            setIsChanging(false);
         },
      }
   );
}
