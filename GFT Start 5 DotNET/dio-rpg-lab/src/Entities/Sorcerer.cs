namespace dio_rpg_lab.src.Entities
{
    public class Sorcerer : Hero
    {
        public Sorcerer(string name, int level, string heroType) : base(name, level, heroType) {}
        public override string Attack()
        {
            return $"{Name} lançou sua magia";
        }

        public String Attack(int bonus) {
          return bonus > 10
            ? $"{Name} lançou bola de energia com {bonus} de dano"
            : $"{Name} lançou sua magia e causou {bonus} de dano";
        }
    }
}