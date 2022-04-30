using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dio_rpg_lab.src.Entities
{
    public class Knight : Hero
    {
        public Knight(string name, int level, string heroType) : base(name, level, heroType) {}
        public override string Attack()
        {
            return $"{Name} atacou com sua espada";
        }
    }
}