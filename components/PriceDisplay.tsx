type Props = { price: number }

export default function PriceDisplay({ price }: Props) {
  return (
    <div className="mt-4 text-center text-lg font-bold">Total Price: ${price.toFixed(2)}</div>
  )
}

