import { AdminTable, type AdminTableColumn } from '../components/ui'
import { PageShell } from './PageShell'

interface UserRow {
  name: string
  email: string
  role: string
  status: string
}

const columns: AdminTableColumn<UserRow>[] = [
  { key: 'name', header: 'Nome', sortable: true },
  { key: 'email', header: 'E-mail' },
  { key: 'role', header: 'Perfil' },
  { key: 'status', header: 'Status' },
]

const users: UserRow[] = [
  {
    name: 'Ana Souza',
    email: 'ana@exemplo.com',
    role: 'Admin',
    status: 'Ativo',
  },
  {
    name: 'Bruno Lima',
    email: 'bruno@exemplo.com',
    role: 'Editor',
    status: 'Ativo',
  },
]

export function UsersPage() {
  return (
    <PageShell
      title="Usuários"
      description="Gerencie os usuários e os acessos da aplicação."
    >
      <section className="page-shell__card" aria-label="Lista de usuários">
        <h2>Usuários cadastrados</h2>
        <AdminTable
          ariaLabel="Usuários cadastrados"
          columns={columns}
          data={users}
          getRowId={(user) => user.email}
          actions={(user) => (
            <button type="button" aria-label={`Editar ${user.name}`}>
              Editar
            </button>
          )}
        />
      </section>
    </PageShell>
  )
}
