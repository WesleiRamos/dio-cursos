namespace dio_rpg_lab.src.Entities
{
    public abstract class Hero
    {
        public string Name { get; set; }
        public int Level { get; set; }

        public String HeroType { get; set; }

        public Hero(string name, int level, string heroType)
        {
            Name = name;
            Level = level;
            HeroType = heroType;
        }

        public virtual string Attack()
        {
            return $"{Name} atacou com sua espada";
        }

        public override string ToString()
        {
            return $"{Name} - {Level} - {HeroType}";
        }
    }
}