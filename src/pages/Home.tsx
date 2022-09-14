import React, { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"
import qs from "qs"

import { useSelector } from 'react-redux'
import { selectorSort, setCategoriesId, setFilters } from "../redux/Slices/filterSlice";
import { fetchPizzas, selectPizzaData } from '../redux/Slices/pizzaSlice'

import Categories from "../components/Categories";
import Sort, { sortlist } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { useAppDispatch } from "../redux/store";





const Home: React.FC = () => {
    

    // const { searchValue } = React.useContext(SearchContext)
    // const [categoriesId, setCategoriesId] = useState(0)
    // const [sortType, setSortType] = useState({
    //      name: 'популярности',
    //      sortProperty: 'rating'
    //     })

      
        const { categoriesId, sort, searchValue } = useSelector(selectorSort)
        const { items, status } = useSelector(selectPizzaData)

        const dispatch = useAppDispatch()
        const navigate = useNavigate()
      

        const isSearch = useRef(false)
        const isMounted = useRef(false)

        const onChangeCategories = useCallback((idx: number) => {
            dispatch(setCategoriesId(idx))
        }, [])

        const getPizzas = async () => {
            // fetch(`https://62fe2b2d41165d66bfba0da5.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}&${search}`
            //     )
            // .then(res => res.json())
            // .then(arr => {
            //         setItems(arr)
            //         setIsLoading(false)       
            // })
            const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
            const sortBy = sort.sortProperty.replace('-', '');
            const category =  categoriesId > 0 ? `category=${categoriesId}` : '';
            const search = searchValue ? `search=${searchValue}` : '';
                
                dispatch(fetchPizzas({order, sortBy, category, search}))  
        }

        // Если был первый рендер и изменили параметры то вшиваем их в адресную строку браузера
    // useEffect(() => {
    //         if (isMounted.current) {
    //          const queryString = qs.stringify({
    //              sortProperty: sort.sortProperty,
    //              categoriesId
    //          })
     
    //          navigate(`/?${queryString}`)
     
    //         }
     
    //         isMounted.current = true
     
    //      }, [categoriesId, sort.sortProperty, searchValue, navigate])

    // Если был первый рендер то проверяем Url пареметры и сохроняем в редаксе
    // useEffect(() => {
    //     if (window.location.search) {
    //         // парсим строку в объект и убираем вопросительный знак
    //         const params = qs.parse(window.location.search.substring(1))
    //         // т.к. sortProperty это строка в браузерной строке запроса то тоже парсим в объект т.к. в стейте изночыльно это объект
    //         const sort = sortlist.find(obj => obj.sortProperty === params.sortProperty)
            
    //         // if (sort) {
    //         //     params.sort = sort
    //         // }
    //         dispatch(setFilters({
    //             ...params,
    //             sort
    //         }))
    //     }
       
    //     isSearch.current = true

    // }, [dispatch])

    // Если был первый рендер то запрашиваем пиццы из вшитых параметров или просто     
    useEffect(() => {
        window.scrollTo(0, 0)
        getPizzas()
        // if (!isSearch.current) {
           
        //  }

        isSearch.current = false

    }, [categoriesId, sort.sortProperty, searchValue,])

  

    return (
        <div className="container">
                    <div className="content__top">
                         <Categories value={categoriesId} onChangeCategories={onChangeCategories} />
                         <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        { status === 'loading' 
                          ? [... new Array(6)].map((_, index) => <Skeleton key={index}/>) 
                          : items.map((obj: any) => <PizzaBlock key={obj.id} {...obj}/>)                  
                        }
                    </div>

        </div>
    );
};

export default Home