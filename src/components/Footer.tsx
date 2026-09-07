import { useBrand, useBrandSupport } from '@/features/brand'

export function Footer() {
  const { brand } = useBrand()
  const support = useBrandSupport()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="layout__footer">
      <div className="layout__footer-inner">
        <span>
          © {currentYear} {brand.companyName}. Todos os direitos reservados.
        </span>

        {support && (
          <div>
            <span>Suporte: </span>
            {support.url ? (
              <a href={support.url} target="_blank" rel="noopener noreferrer">
                {support.domain || support.email || support.url}
              </a>
            ) : support.email ? (
              <a href={`mailto:${support.email}`}>{support.email}</a>
            ) : (
              <span>{support.domain}</span>
            )}
          </div>
        )}
      </div>
    </footer>
  )
}
