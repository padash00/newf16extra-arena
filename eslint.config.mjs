import nextVitals from "eslint-config-next/core-web-vitals"

const config = [
  ...nextVitals,
  {
    ignores: ["components/ui/**"],
  },
  {
    files: ["components/booking-modal.tsx"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
]

export default config
