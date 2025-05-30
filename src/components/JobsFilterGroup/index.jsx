import ProfileDetails from '../ProfileDetails';

const JobsFilterGroup = (props) => {
  const {
    employmentTypesList,
    salaryRangesList,
    changeEmploymentType,
    changeSalaryRange,
  } = props;

  const handleEmploymentTypeChange = (event) => {
    const { value, checked } = event.target;
    changeEmploymentType(value, checked);
  };

  const getEmploymentTypeList = () => {
    return employmentTypesList.map((employ) => {
      return (
        <li
          className="flex items-center pb-5"
          key={employ.employmentTypeId}
        >
          <input
            type="checkbox"
            className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
            id={employ.employmentTypeId}
            value={employ.employmentTypeId}
            onChange={handleEmploymentTypeChange}
          />
          <label
            htmlFor={employ.employmentTypeId}
            className="text-white ml-2 text-sm"
          >
            {employ.label}
          </label>
        </li>
      );
    });
  };

  const renderEmploymentType = () => (
    <div className="flex flex-col">
      <h1 className="text-white font-roboto font-semibold text-lg mb-4 mt-7">
        Type of Employment
      </h1>
      <ul className="list-none p-0 m-0">{getEmploymentTypeList()}</ul>
    </div>
  );

  const getSalaryRangeList = () => {
    return salaryRangesList.map((salary) => {
      const onChangeSalary = () => changeSalaryRange(salary.salaryRangeId);

      return (
        <li
          className="flex items-center pb-5"
          key={salary.salaryRangeId}
        >
          <input
            type="radio"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            id={salary.salaryRangeId}
            name="salary"
            onChange={onChangeSalary}
          />
          <label
            htmlFor={salary.salaryRangeId}
            className="text-white ml-2 text-sm"
          >
            {salary.label}
          </label>
        </li>
      );
    });
  };

  const renderSalaryRange = () => (
    <div className="flex flex-col">
      <h1 className="text-white font-roboto font-semibold text-lg mb-4 mt-7">
        Salary Range
      </h1>
      <ul className="list-none p-0 m-0">{getSalaryRangeList()}</ul>
    </div>
  );

  return (
    <div className="flex flex-col justify-center ml-4">
      <ProfileDetails />
      <hr className="w-full border border-gray-500 my-4" />
      {renderEmploymentType()}
      <hr className="w-full border border-gray-500 my-4" />
      {renderSalaryRange()}
    </div>
  );
};

export default JobsFilterGroup;