import React, { useState } from 'react'
import dummyReports from '../dummyReports'

const ReportsPage = () => {
  const [expandedStudent, setExpandedStudent] = useState(null)

  const toggleExpand = (id) => {
    setExpandedStudent(expandedStudent === id ? null : id)
  }

  // Determine risk level based on PHQ-9 and GAD-7
  const getRiskLevel = (tests) => {
    let level = 'green' // OK by default
    tests.forEach((test) => {
      const score = test.score
      if (test.test_type === 'PHQ-9') {
        if (score > 15) level = 'red' // Critical
        else if (score >= 10 && level !== 'red') level = 'yellow' // Moderate
        else if (score >= 5 && level !== 'red' && level !== 'yellow') level = 'yellow' // Mild
      } else if (test.test_type === 'GAD-7') {
        if (score > 14) level = 'red' // Critical
        else if (score >= 10 && level !== 'red') level = 'yellow' // Moderate
        else if (score >= 5 && level !== 'red' && level !== 'yellow') level = 'yellow' // Mild
      }
    })
    return level
  }

  const getRiskLabel = (tests) => {
    const level = getRiskLevel(tests)
    if (level === 'red') return 'Critical'
    if (level === 'yellow') return 'Moderate/Mild'
    return 'Minimal/OK'
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Reports</h1>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Year</th>
          </tr>
        </thead>
        <tbody>
          {dummyReports.map((student) => {
            const riskLevel = getRiskLevel(student.tests)
            const riskLabel = getRiskLabel(student.tests)
            const bgColor =
              riskLevel === 'red'
                ? 'bg-red-100'
                : riskLevel === 'yellow'
                ? 'bg-yellow-100'
                : 'bg-green-100'

            return (
              <React.Fragment key={student.id}>
                <tr
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleExpand(student.id)}
                >
                  <td
                    className={`border p-2 font-medium text-blue-700 ${
                      expandedStudent === student.id ? bgColor : ''
                    }`}
                  >
                    {student.name}{' '}
                    {expandedStudent === student.id && `- ${riskLabel}`}
                  </td>
                  <td className="border p-2">{student.year}</td>
                </tr>

                {expandedStudent === student.id && (
                  <tr>
                    <td colSpan={2} className={`border p-4 ${bgColor}`}>
                      <div>
                        <strong>Email:</strong> {student.email}
                      </div>
                      <div>
                        <strong>Phone:</strong> {student.phone}
                      </div>
                      <div>
                        <strong>College:</strong> {student.college}
                      </div>
                      <div className="mt-2">
                        <strong>Tests:</strong>
                        {student.tests.length > 0 ? (
                          <ul className="list-disc list-inside">
                            {student.tests.map((test) => (
                              <li key={test.id}>
                                {test.test_type}: {test.score}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span> No tests</span>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ReportsPage
