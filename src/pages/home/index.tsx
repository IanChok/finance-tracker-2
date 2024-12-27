export const Home = () => {
  const handleFileUpload = async (event: any ) => {
    const file = event.target.files[0];
    if (!file || !file.name.endsWith(".csv")) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      // const data = await response.json();
    } catch (error) {
      alert(error);
    }
  };
  return (
    <button>
      <input type='file' accept='.csv' onChange={handleFileUpload}/>
    </button>
  );
};
