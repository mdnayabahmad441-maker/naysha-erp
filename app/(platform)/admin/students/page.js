'use client'

import { useEffect, useState } from 'react'

export default function StudentsPage() {
  const [students, setStudents] = useState([])
  const [classes, setClasses] = useState([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    classId: '',
  })

  const schoolId = 1

  // Fetch Students + Classes
  const fetchData = async () => {
    try {
      setLoading(true)

      const studentRes = await fetch('/api/students')
      const studentData = await studentRes.json()

      const classRes = await fetch('/api/classes')
      const classData = await classRes.json()

      setStudents(Array.isArray(studentData) ? studentData : [])
      setClasses(Array.isArray(classData) ? classData : [])
    } catch (error) {
      console.error('Fetch error:', error)
      setStudents([])
      setClasses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await fetch('/api/students', {
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
        classId: '',
      })

      fetchData()
    } catch (error) {
      console.error('Create error:', error)
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ marginBottom: 20 }}>Students Management</h1>

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
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <select
          value={form.classId}
          onChange={(e) =>
            setForm({ ...form, classId: e.target.value })
          }
        >
          <option value="">Assign Class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} {c.section || ''}
            </option>
          ))}
        </select>

        <button type="submit">Add Student</button>
      </form>

      {/* TABLE */}
      {loading ? (
        <p>Loading students...</p>
      ) : (
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
              <th style={thStyle}>Class</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: 15 }}>
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((s) => (
                <tr key={s.id}>
                  <td style={tdStyle}>
                    {s.firstName} {s.lastName}
                  </td>
                  <td style={tdStyle}>{s.email || '-'}</td>
                  <td style={tdStyle}>{s.phone || '-'}</td>
                  <td style={tdStyle}>
                    {s.class
                      ? `${s.class.name} ${s.class.section || ''}`
                      : 'Not Assigned'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
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