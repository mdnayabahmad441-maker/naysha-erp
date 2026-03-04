'use client'

import { useEffect, useState } from 'react'

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([])

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
  })

  const schoolId = 1

  const fetchTeachers = async () => {
    const res = await fetch('/api/teachers')
    const data = await res.json()
    setTeachers(data)
  }

  useEffect(() => {
    fetchTeachers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch('/api/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        schoolId,
      }),
    })

    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
    })

    fetchTeachers()
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ marginBottom: 20 }}>Teachers Management</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 15,
          marginBottom: 40,
        }}
      >
        <input
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) =>
            setForm({ ...form, firstName: e.target.value })
          }
          required
        />

        <input
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) =>
            setForm({ ...form, lastName: e.target.value })
          }
          required
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          required
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) =>
            setForm({ ...form, subject: e.target.value })
          }
          required
        />

        <button type="submit">Add Teacher</button>
      </form>

      {/* TABLE */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Subject</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t.id}>
              <td style={tdStyle}>
                {t.firstName} {t.lastName}
              </td>
              <td style={tdStyle}>{t.email}</td>
              <td style={tdStyle}>{t.phone}</td>
              <td style={tdStyle}>{t.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const thStyle = {
  borderBottom: '1px solid #444',
  padding: 10,
  textAlign: 'left',
}

const tdStyle = {
  borderBottom: '1px solid #333',
  padding: 10,
}