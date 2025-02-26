import { type AppType } from "next/app";
import { api, trpcClient } from "~/utils/api"; 
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "~/styles/globals.css";

const queryClient = new QueryClient();

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <Component {...pageProps} />
      </api.Provider>
    </QueryClientProvider>
  );
};

export default MyApp;
