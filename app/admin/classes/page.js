'use client'

import { useEffect, useState } from 'react'

export default function ClassesPage() {
  const [classes, setClasses] = useState([])
  const [teachers, setTeachers] = useState([])

  const [form, setForm] = useState({
    name: '',
    section: '',
    teacherId: '',
  })

  const schoolId = 1

  const fetchData = async () => {
    const classRes = await fetch('/api/classes')
    const classData = await classRes.json()
    setClasses(classData)

    const teacherRes = await fetch('/api/teachers')
    const teacherData = await teacherRes.json()
    setTeachers(teacherData)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await fetch('/api/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        schoolId,
      }),
    })

    setForm({
      name: '',
      section: '',
      teacherId: '',
    })

    fetchData()
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Classes Management</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input
          placeholder="Class Name (e.g. Grade 1)"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Section (A, B, C)"
          value={form.section}
          onChange={(e) => setForm({ ...form, section: e.target.value })}
        />

        <select
          value={form.teacherId}
          onChange={(e) =>
            setForm({ ...form, teacherId: e.target.value })
          }
        >
          <option value="">Select Class Teacher</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.firstName} {t.lastName}
            </option>
          ))}
        </select>

        <button type="submit">Create Class</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Section</th>
            <th>Teacher</th>
            <th>Total Students</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.section}</td>
              <td>
                {c.teacher
                  ? `${c.teacher.firstName} ${c.teacher.lastName}`
                  : 'Not Assigned'}
              </td>
              <td>{c.students.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}