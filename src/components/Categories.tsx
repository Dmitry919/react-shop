import React from "react";

type CategoriesProps = {
    value: number;
    onChangeCategories: (i: number) => void;
}

const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
];

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategories }) => {
    
   

    // const [activeIndex, setActive] = React.useState(0);

    // const onClickCategories = (index) => {
    //     setActive(index)
    // }

    return (
        <div className="categories">
            <ul>
                {categories.map((categoriName, i) => (
                    <li
                        key={i}
                        onClick={() => onChangeCategories(i)}
                        className={value === i ? "active" : ""}
                    >
                        {categoriName}
                    </li>
                ))}
            </ul>
        </div>
    );
})

export default Categories
