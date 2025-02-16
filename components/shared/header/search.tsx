import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";


const Search = () => {
  return (
    <form action='/search' method='GET' className='flex items-stretch h-10 '>

      <Input
        className='flex-1 rounded-l-3xl rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full'
        placeholder="Search..."
        name='q'
        type='search'
      />
      <button
        type='submit'
        className='bg-primary text-primary-foreground text-black rounded-s-none rounded-e-md h-full px-3 py-2 '
      >
        <SearchIcon className='w-6 h-6' />
      </button>
    </form>
  )
}

export default Search