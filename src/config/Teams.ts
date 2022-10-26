import Assets from '../assets';
const Teams = [
    { name: 'Qatar', flag: Assets.qatar, group: 'A' },
    { name: 'Ecuador', flag: Assets.ecuador, group: 'A' },
    { name: 'Senegal', flag: Assets.senegal, group: 'A' },
    { name: 'Netherlands', flag: Assets.netherlands, group: 'A' },

    { name: 'England', flag: Assets.england, group: 'B' },
    { name: 'Iran', flag: Assets.ir_iran, group: 'B' },
    { name: 'USA', flag: Assets.usa, group: 'B' },
    { name: 'Wales', flag: Assets.wales, group: 'B' },

    { name: 'Argentina', flag: Assets.argentina, group: 'C' },
    { name: 'Saudi Arabia', flag: Assets.saudi_arabia, group: 'C' },
    { name: 'Mexico', flag: Assets.mexico, group: 'C' },
    { name: 'Poland', flag: Assets.poland, group: 'C' },

    { name: 'France', flag: Assets.france, group: 'D' },
    { name: 'Australia', flag: Assets.australia, group: 'D' },
    { name: 'Denmark', flag: Assets.denmark, group: 'D' },
    { name: 'Tunisia', flag: Assets.tunisia, group: 'D' },

    { name: 'Spain', flag: Assets.spain, group: 'E' },
    { name: 'Costa Rica', flag: Assets.costa_rica, group: 'E' },
    { name: 'Germany', flag: Assets.germany, group: 'E' },
    { name: 'Japan', flag: Assets.japan, group: 'E' },

    { name: 'Belgium', flag: Assets.belgium, group: 'F' },
    { name: 'Canada', flag: Assets.canada, group: 'F' },
    { name: 'Morocco', flag: Assets.morocco, group: 'F' },
    { name: 'Croatia', flag: Assets.croatia, group: 'F' },

    { name: 'Brazil', flag: Assets.brazil, group: 'G' },
    { name: 'Serbia', flag: Assets.serbia, group: 'G' },
    { name: 'Switzerland', flag: Assets.switzerland, group: 'G' },
    { name: 'Cameroon', flag: Assets.cameroon, group: 'G' },

    { name: 'Portugal', flag: Assets.portugal, group: 'H' },
    { name: 'Ghana', flag: Assets.ghana, group: 'H' },
    { name: 'Uruguay', flag: Assets.uruguay, group: 'H' },
    { name: 'South Korea', flag: Assets.korea_republic, group: 'H' },
]

export const Settings = {
    sound: 1,
    vibration: 1,
}

export default Teams;