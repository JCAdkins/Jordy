/* eslint-disable react/prop-types */
const getHours = (hour) => {
  if (hour === 0) return "12";
  if (hour > 12) return hour - 12;
  return hour;
};

const OverlayCard = (props) => {
  const date = new Date(props.date);
  const name =
    props.className +
    " max-w-sm text-sm p-6 bg-app_accent-900 mb-2.5 mt-2 divide-y text-center border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700";
  return (
    <div className={name}>
      <a href="#">
        <h5 className="mb-2 text-lg font-bold tracking-tight dark:text-white">
          {props.title}
        </h5>
      </a>
      <div className="mb-1 py-2 min-w-[16ch] font-normal">
        <p>
          {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
        </p>
        <p>
          {getHours(date.getHours())}:
          {date.getMinutes().toString().padStart(2, "0")}
          {date.getHours() > 12 ? "PM" : "AM"}
        </p>
      </div>
      <div
        className={`${props.overflow} mb-3 py-4 bg-gray-100 rounded-lg font-normal text-center text-gray-700 dark:text-gray-400`}
      >
        {props.description}
      </div>
      {props.buttonVisible && (
        <button
          type="button"
          onClick={props.onButtonClick}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {props.buttonText}
        </button>
      )}
    </div>
  );
};

export default OverlayCard;
