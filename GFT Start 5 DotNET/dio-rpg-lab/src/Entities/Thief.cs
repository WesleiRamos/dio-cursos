namespace dio_rpg_lab.src.Entities
{
    public class Thief : Hero
    {
        public Thief(string name, int level, string heroType) : base(name, level, heroType) {}
        public override string Attack()
        {
            return $"{Name} atacou com sua adaga";
        }
    }
}