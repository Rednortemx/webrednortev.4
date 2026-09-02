'use client';

import { useMemo, useState } from 'react';

const INITIAL_VALUES = {
  acquisitionPrice: '',
  closingCosts: '',
  initialImprovements: '',
  monthlyRent: '',
  monthlyMaintenance: '',
  annualPropertyTax: '',
  annualInsurance: '',
  annualOtherExpenses: '',
  vacancyPercent: '5',
};

const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat('es-MX', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function toNumber(value) {
  const parsed = Number(String(value).replace(/,/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function InvestmentCalculator() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [hasInteracted, setHasInteracted] = useState(false);

  const results = useMemo(() => {
    const acquisitionPrice = toNumber(values.acquisitionPrice);
    const closingCosts = toNumber(values.closingCosts);
    const initialImprovements = toNumber(values.initialImprovements);
    const monthlyRent = toNumber(values.monthlyRent);
    const monthlyMaintenance = toNumber(values.monthlyMaintenance);
    const annualPropertyTax = toNumber(values.annualPropertyTax);
    const annualInsurance = toNumber(values.annualInsurance);
    const annualOtherExpenses = toNumber(values.annualOtherExpenses);
    const vacancyPercent = Math.min(Math.max(toNumber(values.vacancyPercent), 0), 100);

    const totalInvestment = acquisitionPrice + closingCosts + initialImprovements;
    const annualGrossIncome = monthlyRent * 12;
    const effectiveAnnualIncome = annualGrossIncome * (1 - vacancyPercent / 100);
    const annualOperatingExpenses =
      monthlyMaintenance * 12 + annualPropertyTax + annualInsurance + annualOtherExpenses;
    const annualNetIncome = effectiveAnnualIncome - annualOperatingExpenses;
    const grossYield = totalInvestment > 0 ? (annualGrossIncome / totalInvestment) * 100 : 0;
    const netYield = totalInvestment > 0 ? (annualNetIncome / totalInvestment) * 100 : 0;
    const monthlyNetIncome = annualNetIncome / 12;

    return {
      totalInvestment,
      annualGrossIncome,
      annualOperatingExpenses,
      annualNetIncome,
      monthlyNetIncome,
      grossYield,
      netYield,
    };
  }, [values]);

  const updateValue = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setHasInteracted(true);
  };

  const resetCalculator = () => {
    setValues(INITIAL_VALUES);
    setHasInteracted(false);
  };

  return (
    <div className="invest-calculator-card" data-event="investment_calculator_start">
      <div className="invest-calculator-fields">
        <label>
          <span>Precio de adquisición *</span>
          <input
            name="acquisitionPrice"
            value={values.acquisitionPrice}
            onChange={updateValue}
            inputMode="decimal"
            placeholder="$"
          />
        </label>

        <label>
          <span>Renta mensual estimada *</span>
          <input
            name="monthlyRent"
            value={values.monthlyRent}
            onChange={updateValue}
            inputMode="decimal"
            placeholder="$"
          />
        </label>

        <label>
          <span>Gastos de adquisición</span>
          <input
            name="closingCosts"
            value={values.closingCosts}
            onChange={updateValue}
            inputMode="decimal"
            placeholder="$"
          />
        </label>

        <label>
          <span>Adecuaciones iniciales</span>
          <input
            name="initialImprovements"
            value={values.initialImprovements}
            onChange={updateValue}
            inputMode="decimal"
            placeholder="$"
          />
        </label>

        <label>
          <span>Mantenimiento mensual</span>
          <input
            name="monthlyMaintenance"
            value={values.monthlyMaintenance}
            onChange={updateValue}
            inputMode="decimal"
            placeholder="$"
          />
        </label>

        <label>
          <span>Vacancia estimada</span>
          <div className="invest-input-suffix">
            <input
              name="vacancyPercent"
              value={values.vacancyPercent}
              onChange={updateValue}
              inputMode="decimal"
              min="0"
              max="100"
            />
            <span>%</span>
          </div>
        </label>

        <label>
          <span>Predial anual</span>
          <input
            name="annualPropertyTax"
            value={values.annualPropertyTax}
            onChange={updateValue}
            inputMode="decimal"
            placeholder="$"
          />
        </label>

        <label>
          <span>Seguro anual</span>
          <input
            name="annualInsurance"
            value={values.annualInsurance}
            onChange={updateValue}
            inputMode="decimal"
            placeholder="$"
          />
        </label>

        <label className="invest-calculator-full">
          <span>Otros gastos anuales</span>
          <input
            name="annualOtherExpenses"
            value={values.annualOtherExpenses}
            onChange={updateValue}
            inputMode="decimal"
            placeholder="$"
          />
        </label>
      </div>

      <div className="invest-calculator-results" aria-live="polite">
        <div>
          <span>Inversión total capturada</span>
          <strong>{currencyFormatter.format(results.totalInvestment)}</strong>
        </div>
        <div>
          <span>Ingreso bruto anual</span>
          <strong>{currencyFormatter.format(results.annualGrossIncome)}</strong>
        </div>
        <div>
          <span>Gastos operativos anuales</span>
          <strong>{currencyFormatter.format(results.annualOperatingExpenses)}</strong>
        </div>
        <div>
          <span>Flujo neto anual estimado</span>
          <strong>{currencyFormatter.format(results.annualNetIncome)}</strong>
        </div>
        <div>
          <span>Rendimiento bruto anual</span>
          <strong>{percentFormatter.format(results.grossYield)}%</strong>
        </div>
        <div>
          <span>Rendimiento neto anual estimado</span>
          <strong>{percentFormatter.format(results.netYield)}%</strong>
        </div>
      </div>

      {hasInteracted && (
        <p className="invest-calculator-summary">
          Flujo mensual neto estimado: <strong>{currencyFormatter.format(results.monthlyNetIncome)}</strong>
        </p>
      )}

      <div className="invest-calculator-footer">
        <button type="button" onClick={resetCalculator} className="invest-calculator-reset">
          Limpiar calculadora
        </button>
        <a className="invest-inline-link" href="#solicitar-analisis">
          Revisar este escenario con Rednorte →
        </a>
      </div>

      <p className="invest-calculator-disclaimer">
        Cálculo orientativo. No contempla financiamiento, impuestos sobre ingresos, depreciación, plusvalía, gastos extraordinarios ni cambios de mercado. Los resultados dependen de los datos ingresados y no constituyen una promesa de rendimiento.
      </p>
    </div>
  );
}
