import React from 'react';
import { useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/Slices/filterSlice';
import debounce from 'lodash.debounce';
import style from './Search.module.scss'



const Search: React.FC = () => {

    // const { setSearchValue } = React.useContext(SearchContext)
    const dispatch = useDispatch()
    const [currentValue, setCurrentValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str))
    }, 300),
    []
    )
    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.target.value)
        updateSearchValue(e.target.value)
    }

    const onClickClear = () => {     
        dispatch(setSearchValue(''))
        setCurrentValue('')
        // if (inputRef.current) {
        // inputRef.current.focus()
        // }
        inputRef.current?.focus()
    }

    return(
        <div className='search_container'>
        <div className={style.root}>
            <svg className={style.icon} xmlns="http://www.w3.org/2000/svg" 
                 viewBox="0 0 24 24">
                    <title/>
                    <g data-name="Layer 2" id="Layer_2">
                        <path d="M18,10a8,8,0,1,0-3.1,6.31l6.4,6.4,1.41-1.41-6.4-6.4A8,8,0,0,0,18,10Zm-8,6a6,6,0,1,1,6-6A6,6,0,0,1,10,16Z"/>
                    </g>
            </svg>
            <input ref={inputRef} value={currentValue} onChange={onChangeInput} className={style.input} placeholder='Поиск пиццы ...'/>
            {currentValue &&
            <svg onClick={onClickClear} className={style.icon_clear} 
                 height="48" 
                 viewBox="0 0 48 48" width="48"
                 xmlns="http://www.w3.org/2000/svg">
                    <path d="M38 12.83L35.17 10 24 21.17 12.83 10 10 12.83 21.17 24 10 35.17 12.83 38 24 26.83 35.17 38 38 35.17 26.83 24z"/>
                    <path d="M0 0h48v48H0z" fill="none"/>
            </svg>
            }
        </div>
        </div>
    )
}

export default Search