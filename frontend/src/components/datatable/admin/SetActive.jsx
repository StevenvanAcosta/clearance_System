import React, { useState } from 'react';

const SetActive = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('BSIT');
  const [selectedData, setSelectedData] = useState({
    BSIT: { yearLevel: '', sections: [] },
    BSIS: { yearLevel: '', sections: [] },
    BSCS: { yearLevel: '', sections: [] },
  });

  const sections = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  const yearLevels = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleYearLevelChange = (course, yearLevel) => {
    setSelectedData((prev) => ({
      ...prev,
      [course]: { ...prev[course], yearLevel, sections: [] }, // Reset sections when year level changes
    }));
  };

  const handleSectionChange = (course, section) => {
    setSelectedData((prev) => {
      const courseData = prev[course];
      const updatedSections = courseData.sections.includes(section)
        ? courseData.sections.filter((item) => item !== section)
        : [...courseData.sections, section];

      return {
        ...prev,
        [course]: { ...courseData, sections: updatedSections },
      };
    });
  };

  const renderContent = (course) => {
    const courseData = selectedData[course];

    return (
      <div className="p-4 border rounded">
        <h3 className="font-bold text-lg mb-4">{course} Year Level and Sections</h3>

        {/* Year Level */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Year Level:</h4>
          <select
            value={courseData.yearLevel}
            onChange={(e) => handleYearLevelChange(course, e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="" disabled>
              Select Year Level
            </option>
            {yearLevels.map((yearLevel) => (
              <option key={yearLevel} value={yearLevel}>
                {yearLevel}
              </option>
            ))}
          </select>
        </div>

        {/* Sections */}
        {courseData.yearLevel && (
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Sections:</h4>
            {sections.map((section) => (
              <label key={section} className="block">
                <input
                  type="checkbox"
                  value={section}
                  checked={courseData.sections.includes(section)}
                  onChange={() => handleSectionChange(course, section)}
                />
                <span className="ml-2">Section {section.toUpperCase()}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-green-500 p-2 text-white rounded-lg"
        onClick={toggleModal}
      >
        Set Active
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Set Active Courses Year and Sections</h2>
              <button className="text-red-500 font-bold" onClick={toggleModal}>
                Close
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-4">
              {['BSIT', 'BSIS', 'BSCS'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded ${
                    activeTab === tab
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dynamic Content */}
            {renderContent(activeTab)}
          </div>
        </div>
      )}
    </div>
  );
};

export default SetActive;
