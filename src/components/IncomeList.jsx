import { formatMoney } from "../utils/format-money";
import { useEntries } from "../hooks/useEntries";


export default function IncomeList() {
  const { entries,afterdelete,editedEntry } = useEntries();
  const incomeEntries = entries.filter((entry) => entry.type === "income");

  const handleDelete=id=>{
    console.log("object",id);
    afterdelete(id);
  }
  const handleEdit=(title,value,id)=>{
    editedEntry(title,value,id);
  }
  return (
    <div>
      <h2 className="border-b pb-2 font-medium text-green-600">Income</h2>
      {incomeEntries.length === 0 && (
        <p className="py-2.5 text-gray-600">There are no expenses.</p>
      )}

      <ul id="income-list" className="divide-y">
        {incomeEntries.map((income) => {
          return (
            <li key={income.id} className="py-2.5">
              <div className="group flex justify-between gap-2 text-sm">
                <span>{income.title}</span>

                <div>
                  <span className="text-green-600">
                    +{formatMoney(income.value)}
                  </span>
                  <span className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block">
                    <button onClick={()=>handleDelete(income.id)}>Delete</button>
                  </span>
                  <span className="ml-2 hidden cursor-pointer font-medium text-red-500 group-hover:inline-block">
                    <button onClick={()=>handleEdit(income.title,income.value,income.id)}>Edit</button>
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
