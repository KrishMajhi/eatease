import React from "react";

const Menu = () => {
  const sections = [
    {
      title: "Starters",
      bg: "bg-orange-50",
      titleColor: "text-orange-700",
      items: [
        { name: "Spring Rolls", price: "$4.99" },
        { name: "Garlic Bread", price: "$3.49" },
      ],
    },
    {
      title: "Main Course",
      bg: "bg-green-50",
      titleColor: "text-green-700",
      items: [
        { name: "Grilled Chicken", price: "$12.99" },
        { name: "Veggie Pasta", price: "$9.99" },
      ],
    },
    {
      title: "Desserts",
      bg: "bg-pink-50",
      titleColor: "text-pink-700",
      items: [
        { name: "Chocolate Cake", price: "$5.99" },
        { name: "Ice Cream", price: "$3.99" },
      ],
    },
  ];

  return (
    <div className="max-w-[1000px] mx-auto h-100 bg-gradient-to-b from-teal-300 to-teal-400   shadow-xl overflow-y-auto mt-48  ">
      <h1 className="text-3xl font-extrabold text-yellow-200 text-center mb-6 tracking-wide">
        Menu
      </h1>

      <div className="flex flex-col gap-5  h-">
        {sections.map((section) => (
          <div
            key={section.title}
            className={`${section.bg} rounded-xl shadow-md p-36   hover:shadow-lg transition `}
          >
            <h2 className={`text-base font-semibold mb-3 ${section.titleColor}`}>
              {section.title}
            </h2>
            <div className="flex flex-col gap-3">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="flex justify-between items-center"
                >
                  <p className="text-gray-700 text-sm font-medium">
                    {item.name} - {item.price}
                  </p>
                  <button className="bg-yellow-300 hover:bg-yellow-400 text-black text-xs font-semibold px-2.5 py-1 rounded-full transition active:scale-95">
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
