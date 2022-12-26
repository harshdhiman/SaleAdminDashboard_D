import { useMemo, useState } from "react";
import { useAppSelector } from "./store";
import { themeSettings } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./pages/layout";
import { Dashboard } from "./pages/dashboard";
import { Products } from "./pages/products";
import { Customers } from "./pages/customers";
import { Transactions } from "./pages/transactions";
import { Geography } from "./pages/geography";
import { OverviewPage } from "./pages/overview";
import { DailyPage } from "./pages/daily";
import { MonthlyPage } from "./pages/monthly";
import { BreakdownPage } from "./pages/breakdown";
import { AdminsPage } from "./pages/admins";
import { PerformancePage } from "./pages/performance";

function App() {
  const themeMode = useAppSelector((s) => s.global.mode);
  const theme = useMemo(
    () => createTheme(themeSettings(themeMode)),
    [themeMode]
  );

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          {/*  */}

          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route path="/dashboard" element={<Dashboard />} />
              {/*  */}
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              {/*  */}
              <Route path="/overview" element={<OverviewPage />} />
              <Route path="/daily" element={<DailyPage />} />
              <Route path="/monthly" element={<MonthlyPage />} />
              <Route path="/breakdown" element={<BreakdownPage />} />
              {/*  */}
              <Route path="/admin" element={<AdminsPage />} />
              <Route path="/performance" element={<PerformancePage />} />
            </Route>
          </Routes>

          {/*  */}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
