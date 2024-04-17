function RecuitmentTable({
  heading,
  data,
  objectKey,
}: {
  heading: string[];
  data: { [key: string]: string | number }[];
  objectKey: string[];
}) {
  return (
    <div className="relative overflow-x-auto my-5">
      <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-gray-900 uppercase dark:text-gray-400">
          <tr>
            {heading.map((item, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 border border-slate-300 normal-case font-semibold"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {objectKey.map((key, colIndex) => (
                <td key={colIndex} className="border border-slate-300">
                  {item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecuitmentTable;
