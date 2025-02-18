export default function adminCases() {
  return (
    <div>
      <h1>Admin cases</h1>
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b px-4 py-2">Id</th>
            <th className="border-b px-4 py-2">Nome</th>
            <th className="border-b px-4 py-2">CPF</th>
            <th className="border-b px-4 py-2">Email</th>
            <th className="border-b px-4 py-2">Senha</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border-b px-4 py-2">1542</td>
            <td className="border-b px-4 py-2">Ichigo</td>
            <td className="border-b px-4 py-2">15</td>
            <td className="border-b px-4 py-2">strawberry@</td>
            <td className="border-b px-4 py-2">get outta here</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
