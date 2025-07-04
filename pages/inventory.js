import { useState, useEffect } from 'react'

export default function Inventory() {
  const [devices, setDevices] = useState([])
  const [editingId, setEditingId] = useState(null)
  const emptyForm = {
    ip: '',
    name: '',
    site: '',
    rack: '',
    rackUnit: '',
    serial: '',
    deviceType: 'Router',
    deviceFunction: 'core',
    model: '',
    version: '',
    installDate: ''
  }
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    fetch('/api/devices')
      .then(res => res.json())
      .then(data => setDevices(data))
  }, [])

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (editingId !== null) {
      await fetch(`/api/devices/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      setEditingId(null)
    } else {
      await fetch('/api/devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
    }
    setForm(emptyForm)
    const data = await (await fetch('/api/devices')).json()
    setDevices(data)
  }

  const handleEdit = id => {
    const d = devices.find(x => x.id === id)
    setForm({ ...d, installDate: d.installDate ? d.installDate.substring(0,10) : '' })
    setEditingId(id)
  }

  const handleDelete = async id => {
    await fetch(`/api/devices/${id}`, { method: 'DELETE' })
    setDevices(devices.filter(d => d.id !== id))
  }

  return (
    <div>
      <h1>Inventario de Equipos</h1>
      <form onSubmit={handleSubmit} style={{marginBottom:'1rem'}}>
        <input name="ip" placeholder="IP gestión" value={form.ip} onChange={handleChange} />{' '}
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />{' '}
        <input name="site" placeholder="Sitio" value={form.site} onChange={handleChange} />{' '}
        <input name="rack" placeholder="Rack" value={form.rack} onChange={handleChange} />{' '}
        <input name="rackUnit" placeholder="Unidad de rack" value={form.rackUnit} onChange={handleChange} />{' '}
        <input name="serial" placeholder="Serial" value={form.serial} onChange={handleChange} />{' '}
        <select name="deviceType" value={form.deviceType} onChange={handleChange}>
          <option>Router</option>
          <option>Switch</option>
          <option>Firewall</option>
          <option>Otro</option>
        </select>{' '}
        <select name="deviceFunction" value={form.deviceFunction} onChange={handleChange}>
          <option value="core">core</option>
          <option value="distribucion">distribucion</option>
          <option value="acceso">acceso</option>
        </select>{' '}
        <input name="model" placeholder="Modelo" value={form.model} onChange={handleChange} />{' '}
        <input name="version" placeholder="Versión" value={form.version} onChange={handleChange} />{' '}
        <input name="installDate" type="date" placeholder="Fecha instalación" value={form.installDate} onChange={handleChange} />{' '}
        <button type="submit">{editingId !== null ? 'Actualizar' : 'Agregar'}</button>
      </form>
      <table border="1" cellPadding="4">
        <thead>
          <tr>
            <th>IP gestión</th>
            <th>Nombre</th>
            <th>Sitio</th>
            <th>Rack</th>
            <th>U de Rack</th>
            <th>Serial</th>
            <th>Tipo</th>
            <th>Función</th>
            <th>Modelo</th>
            <th>Versión</th>
            <th>Instalación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(d => (
            <tr key={d.id}>
              <td>{d.ip}</td>
              <td>{d.name}</td>
              <td>{d.site}</td>
              <td>{d.rack}</td>
              <td>{d.rackUnit}</td>
              <td>{d.serial}</td>
              <td>{d.deviceType}</td>
              <td>{d.deviceFunction}</td>
              <td>{d.model}</td>
              <td>{d.version}</td>
              <td>{d.installDate}</td>
              <td>
                <button onClick={() => handleEdit(d.id)}>Editar</button>{' '}
                <button onClick={() => handleDelete(d.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
