using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dio_rpg_lab.src.Entities
{
    public class Wizard : Hero
    {
        public Wizard(string name, int level, string heroType) : base(name, level, heroType) {}
        public override string Attack()
        {
            return $"{Name} lançou sua cura";
        }

        public String Attack(int bonus)
        {
            return bonus > 10
                ? $"{Name} lançou sua cura em area e recuperou {bonus} de vida de seus aliados"
                : $"{Name} lançou sua cura e recuperou {bonus} de vida de seu aliado";
        }        
    }
}