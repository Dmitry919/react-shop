import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const FullPizza: React.FC = () => {
  const { id } = useParams()
  const [pizza, setPizza] = useState<{
    imageUrl: string,
    name: string,
    price: number
  }>()

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(`https://62fe2b2d41165d66bfba0da5.mockapi.io/items/` + id)
        setPizza(data)
      } catch (error) {
        alert('Ошибка при отправки запроса')
      }
    }
    fetchPizza()
  }, [])

  if (!pizza) {
    return <>'Загрузка...'</>
  }

  return (
    <div className='container'>
      <div>
        <img src={pizza.imageUrl} />
        <h2>{pizza.name}</h2>
        <h4>{pizza.price} ₽</h4>
      </div>
    </div>
  )
}

export default FullPizza