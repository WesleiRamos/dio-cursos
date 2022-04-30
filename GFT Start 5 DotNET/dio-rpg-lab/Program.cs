using dio_rpg_lab.src.Entities;

Knight arus = new Knight("Arus", 23, "Knight");
Wizard jennica = new Wizard ("Jennica", 23, "wizard");
Thief ruprest = new Thief ("Ruprest", 23, "Thief");
Sorcerer torin = new Sorcerer ("Torin", 23, "Sorcerer");

Console.WriteLine (arus.Attack());
Console.WriteLine (ruprest.Attack());
Console.WriteLine (jennica.Attack(7));
Console.WriteLine (jennica.Attack(12));
Console.WriteLine (torin.Attack(2));
Console.WriteLine (torin.Attack(15));