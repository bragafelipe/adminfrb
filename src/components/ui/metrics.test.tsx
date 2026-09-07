import { formatCurrency, formatNumber, formatPercent } from './formatters'

// Simple test suite for formatters and component contracts
function testFormatters() {
  console.assert(
    formatCurrency(1250, 'BRL', 'pt-BR').includes('1.250'),
    'formatCurrency should format BRL correctly',
  )

  console.assert(
    formatPercent(12.5, false, 'pt-BR').includes('12,5'),
    'formatPercent should format percentage correctly',
  )

  console.assert(
    formatPercent(12.5, true, 'pt-BR').startsWith('+'),
    'formatPercent with includeSign should include + prefix',
  )

  console.assert(
    formatNumber(1000000, undefined, 'pt-BR') === '1.000.000',
    'formatNumber should format number correctly',
  )
}

testFormatters()
