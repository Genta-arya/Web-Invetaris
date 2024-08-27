import React from "react";

const ContentDashboard = ({dummyData}) => {
  return (
    <div className="px-4 mx-auto py-4 lg:px-12">
      <div className="grid grid-cols-2 gap-4">
        {dummyData.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-lg shadow-lg ${item.color} text-white`}
          >
            <h3 className="text-sm font-semibold">{item.title}</h3>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentDashboard;
