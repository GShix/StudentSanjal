import axios from "axios";
import { useEffect, useState } from "react";

interface SkillData{
    id:number;
    name:string;
}
const Skills = ({ className = '' }: { className?: string },skills?:any) => {

    // const [skills, setSkills] = useState<SkillData[]>([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

//   useEffect(() => {
//     // Fetch skills from the API
//     axios.get('/api/skills').then((response) => {
//       setSkills(response.data);
//     });
//   }, []);

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedSkills(value);
  };

  const handleSubmit = () => {
    // Submit selected skills to the backend
    axios.post('/api/user/skills', { skills: selectedSkills });
  };

  return (
    <div>
        <h1>Skills</h1>
        <div className="skills">
        <select
            multiple={true}
            value={selectedSkills}
            onChange={handleSelect}
            className="form-select">

            {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                    {skill.name}
                </option>
            ))}

      </select>

      <button onClick={handleSubmit} className="btn btn-primary">
        Save Skills
      </button>
        </div>
    </div>
  )
}

export default Skills
