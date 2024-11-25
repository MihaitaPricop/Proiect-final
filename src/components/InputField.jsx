const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 m-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#05A8AA]"
      placeholder={placeholder}
      //   pattern="^\S+$"
      required
    />
  </div>
);

export default InputField;
