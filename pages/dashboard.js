import Link from 'next/link'

export default function Dashboard() {
  return (
    <div style={{display:'flex'}}>
      <aside style={{width:'200px',borderRight:'1px solid #ccc',padding:'1rem'}}>
        <ul>
          <li><Link href="/inventory">Inventario</Link></li>
        </ul>
      </aside>
      <main style={{flexGrow:1,padding:'1rem'}}>
        <h1>Dashboard</h1>
        <p>Bienvenido al panel principal</p>
      </main>
    </div>
  )
}
