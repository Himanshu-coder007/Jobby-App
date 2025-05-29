const SkillsCard = (props) => {
  const { skillDetails } = props;
  const { name, imageUrl } = skillDetails;

  return (
    <li className="flex flex-col justify-center w-[30%] mb-[50px]">
      <div className="flex items-center">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-[60px] mr-[20px]" 
        />
        <p className="text-white text-lg font-roboto mt-[20px]">
          {name}
        </p>
      </div>
    </li>
  );
};

export default SkillsCard;