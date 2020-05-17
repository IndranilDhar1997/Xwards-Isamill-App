//Bullets - \u2022
export default [
    {
        title: 'What is the difference between IsaMill™ Feed and Fresh Feed?',
        contents: [
            {
                text: `\u2022 IsaMill™ Feed – pumped from the IsaMill™ feed pumpbox into the feed end of the IsaMill™. It contains recycled IsaMill™ discharge material.`,
            },
            {
                text: `\u2022 Fresh Feed – new material entering the IsaMill™ feed pumpbox (i.e. does not contain the recycled IsaMill™ discharge material). In the majority of cases, this is IsaMill™ pre-cyclone underflow, or thickener underflow.`
            },
            {
                img: require('./images/9.png')
            },
        ]
    },
    {
        title: 'What is the normal IsaMill™ recirculating load?',
        contents: [
            {
                text: `The IsaMill™ recycle line exists purely to allow a set feed pumpbox level to be maintained without having to vary the IsaMill™ feed flowrate. Constant feed flowrate means more stable IsaMill™ operation. A recycle rate of ~20% is normal (note that the valve openings are not necessarily indicative of the relative flowrates of the recycle and feedforward lines) as it allows a fair bit of movement in the fresh feed rate without having to vary the IsaMill™ Feed flowrate.`,
            },
            {
                text: `For operations that have issues with high slurry viscosity, the operator must minimise the recycle rate as recycled fines will exacerbate any existing viscosity issues.`
            }
        ]
    },
    {
        title: 'How do I calculate the Specific Energy (kWh/t) of the IsaMill™ Grinding Circuit?',
        contents: [
            {
                text: `Specific energy is calculated using the following formula:`,
            },
            {
                img: require('./images/2.png')
            },
            {
                text: `Specific Energy is independent of the IsaMill™ Feed Flowrate; it depends only on the IsaMill™ (net) power draw and fresh feed rate. Increasing or decreasing the IsaMill™ feed flowrate will only vary the amount of discharge recycle. In both diagrams below, the specific energy is 50kWh/t regardless of the different IsaMill™ feed rates.`
            },
            {
                img: require('./images/10.png')
            },
            {
                img: require('./images/11.png')
            },
        ]
    },
    {
        title: 'I want to grind finer. How do I achieve this?',
        contents: [
            {
                img: require('./images/3.png')
            },
            {
                text: `Put simply, higher specific energy means a finer IsaMill™ product. However, it also means hotter discharge slurry. To prevent heat damage of the rubber, the IsaMill™ has a high discharge temperature interlock which will trip the motor out (generally at 70°C).`,
            },
            {
                text: `The operator’s primary control of specific energy (and therefore grind size) is the IsaMill™ Power Draw, which is increased by adding grinding media. Decreasing the IsaMill™ Fresh Feed tonnage will also increase specific energy and result in a finer product, however this is generally not the desired pathway to a finer grind.`
            },
        ]
    },
    {
        title: 'How do I monitor IsaMill™ circuit performance?',
        contents: [
            {
                text: `\u2022 A regrind circuit survey should include samples of the following streams:\n    o    IsaMill™ circuit fresh feed. If IsaMill™ feed comes from pre-cyclones, cyclone feed, underflow and overflow must all be sampled for a complete mass balance to calculate the fresh feed tonnage.\n    o    IsaMill™ Feed\n    o    IsaMill™ Discharge\n    o    (Optional) IsaMill™ Circuit Discharge – Combined pre-cyclone overflow and IsaMill™ discharge.`,
            },
            {
                text: `\u2022 Because of the recycle around the IsaMill™, mill fresh feed (not mill feed) needs to be used when calculating specific energy (compared to the power in the mill per tonne of fresh feed treated).`,
            },
            {
                text: `\u2022 Review downstream performance. The purpose of the regrind mill is to liberate minerals in order to improve the downstream operations, so if the circuit is being operated effectively then plant performance (grade, recovery) should improve.`,
            },
        ]
    },
    {
        title: 'Why should I take thermal profiles of the IsaMill™?',
        contents: [
            {
                text: `\u2022 Thermal imaging of the external surface of the IsaMill™ shell can help to monitor wear state (or potential wear events) of the IsaMill™ shell liner and/or media distribution along the length of the mill.`
            },
            {
                text: `\u2022 Higher temperatures indicate regions of higher media concentration and/or more extensive shell liner wear.`
            },
            {
                text: `\u2022 Thermal profiles of the mill shell are a very good indicator of the wear profile that will be observed when the mill is opened for inspection.`,
            },
            {
                text: `\u2022 If gouging is seen on the shell liner, it is recommended to perform temperature profiles while the mill is operational`,
            },
            {
                img: require('./images/12.png')
            },
            {
                text: `\u2022 Mark 16 points along each side of the mill shell at the “high wear” angle (pictured).`
            },
            {
                text: `\u2022 Use a white paint marker if possible so that they get picked up and are visible in the thermal imaging camera.`,
            },
            {
                text: `\u2022 14 points is sufficient but the last two points are helpful for identifying any media which may be present in the rotor/discharge area.`,
            },
            {
                img: require('./images/13.png')
            },
            {
                img: require('./images/14.png')
            },
        ]
    },
    {
        title: 'Why is there localised, “burning” wear on (a) the shell liner or (b) the disc peripheries?',
        contents: [
            {
                text: `Localised wear on the shell liner (i.e. “gouging”, which is deep, localised wear in the rubber) and “burning” wear on the peripheries of the grinding discs are usually caused by media compaction. This is where localised high concentrations of grinding media lead to compacted bed of media between the disc periphery and the shell liner. This in turn causes localised heat build-up due to friction and accelerated wear of the rubber components in the immediate area.`
            },
            {
                img: require('./images/15.png')
            },
            {
                text: `Media compaction can usually be picked up in thermal profiles of the IsaMill™ shell. As a general rule:`
            },
            {
                img: require('./images/4.png')
            },
            {
                text: `is starting to get too high and suggests that there may be media compaction zones forming. Thermal monitoring is explained in the previous question.`
            },
            {
                text: `The image below shows three different thermal profiles, corresponding to three very different operating conditions:\n\n    1. Increased Wear – There is a large amount of media compacted around Disc 3-4. As a result, there was increased wear on the shell liner and discs in this specific area of the mill.\n\n    2. Low Wear – The media is spread along the mill much more evenly. Resulting wear rates are much lower and even.\n\n    3. Media Loss – The media has spread down towards the discharge end of the mill due to a combination of (1) High IsaMill feed flowrate (2) Too many Small Diameter Discs (SDD) in the mill configuration. Grinding Media is being pumped out of the discharge as a result. `,
            },
            {
                img: require('./images/14.png')
            },
        ]
    },
    {
        title: 'What is a suitable operating density for the IsaMill™?',
        contents: [
            {
                text: `The IsaMill™ is designed to operate at 20% Solids (v/v) (i.e. % Solids by Volume).`
            },
            {
                img: require('./images/5.png')
            },
            {
                img: require('./images/6.png')
            },
            {
                text: `The calculator in this app can be used to convert % Solids (w/w) by mass to % Solids (v/v) by volume. The following formula can also be used:`
            },
            {
                img: require('./images/7.png')
            },
            {
                text: `At densities >20% Solids (v/v) there is an increased risk of excessive slurry viscosity. Slurry Density on a volumetric basis is used because this is a better indicator of particle surface area – one of the main contributors to viscosity – than a mass basis.`,
            },
            {
                text: `We target about 20% solids by volume – as a starting point – as this is the optimum point on the grinding efficiency curve of the IsaMill. If deviations are seen in density, please check the following:`,
            },
            {
                text: `   \u2022 Upstream processes – Has the tonnage/flowrate changed significantly? Have the flotation conditions changed?`,
            },
            {
                text: `   \u2022 Cyclone performance – What is the cyclone pressure? Are any cyclones roping or have blockages? Any change to cyclone feed density or flowrate?`,
            },
            {
                text: `   \u2022 Circuit Water Addition – Has water addition to the circuit changed? Makeup water started for some reason? Dilution water control not working? Has the sump pump started? May be directing water to the feed tank.`,
            },
            {
                text: `   \u2022 Manual Reading – Is there some discrepancy between a manual reading and the density gauge?`,
            },
        ]
    },
    {
        title: 'How often should I check slurry viscosity?',
        contents: [
            {
                text: `If viscosity issues are suspected, regular viscosity checks should be conducted a couple times a shift (every 3 – 4 hours). These checks are done by measuring the IsaMill™ discharge using a Marsh funnel. It is expected that it there are no viscosity concerns if the time taken for the slurry to pass through the Marsh funnel is less than 36 seconds.`
            },
            {
                img: require('./images/16.png')
            },
            {
                text: `Slurry viscosity is correlated with the surface area of solid material exposed to water and is therefore proportional to:\n`
            },
            {
                text: `   \u2022 Increased % Solids (v/v) – Greater number of particles per unit volume.`,
            },
            {
                text: `   \u2022 Finer Particle Size Distribution – Increased surface area per unit volume of solid material. P80 is often not a sufficient measure, as this doesn’t tell us much about the finer end of the particle size distribution. P50 is a more suitable measurement in this case.`,
            },
            {
                text: `Slurry viscosity will also significantly depend on specific ore characteristics.`
            },
            {
                text: `If the IsaMill™ internal slurry viscosity gets too high, the charge inside the mill will lock up and begin to “free-wheel” resulting in a sudden drop in IsaMill™ Power Draw; this is often accompanied by an increase in vibration, drop in feed pressure across the mill inlet and a significant drop off in grinding efficiency. Slurry may also become considerably more difficult to pump.`,
            },
            {
                img: require('./images/17.png')
            },
        ]
    },
    {
        title: 'Why is the discharge temperature of the IsaMill™ increasing?',
        contents: [
            {
                text: `The following flowchart demonstrates how various IsaMill™ variables can interact and cause an increase in the discharge temperature. This chart can be used to troubleshoot the cause in the step change.`
            },
            {
                img: require('./images/18.png')
            },
        ]
    },
    {
        title: 'What can cause accelerated wear of the Rotor and Discharge End Components?',
        contents: [
            {
                text: `During standard operation of the IsaMill™, there should be essentially no media in the rotor area. The wear rate of the rotor is therefore generally very low. High rotor wear rates indicate that there may be media present in this area during operation. Several factors can affect the media distribution along the length of the shell, primarily:`
            },
            {
                text: `\u2022 IsaMill™ internal component configuration:`,
            },
            {
                text: `    o    Number of Small Diameter Discs (SDD’s): SDD’s don’t retain media towards the feed end or draw as much power as the normal diameter discs. Therefore SDD’s decrease the power draw capabilities of the mill (the effect is twofold: lower media retention capabilities and lower power draw per disc).\n\n    o    Rotor Finger Types (Square vs. Rhomboidal vs. De-rated): Rhomboidal fingers have higher back-pumping capacity than square fingers. Can replace a fraction, or all, of the square fingers with rhomboidal fingers depending on the mill flow/power draw requirements.`
            },
            {
                text: `\u2022 Internal Viscosity.`,
            },
            {
                text: `\u2022 Particle Size Distribution: Very Coarse particles in the feed can act as media and displace the media towards the discharge end of the mill.`,
            },
            {
                text: `\u2022 Mill Speed (VSD Mills only): As the mill speed drops, the rotor is essentially de-rated (as observed during startup) and the media gravitates towards the discharge end.`,
            },
            {
                text: `\u2022 Power Draw: The greater the amount of media in the mill, the greater the power draw and the further down the mill the media charge will extend. The higher the power draw and throughput requirements of a mill, the more likely media loss becomes.`,
            },
            {
                text: `The following diagram illustrates the relationship between the aforementioned variables and grinding media distribution:`
            },
            {
                img: require('./images/19.png')
            },
        ]
    },
    {
        title: 'Media Consumption is high, what might be causing this?',
        contents: [
            {
                text: `The most reliable measure of grinding media consumption is grams of media/IsaMill™ kWh. Good quality grinding media should wear at a rate of ~8g/kWh or less. The following may contributed to higher media consumption rates:`
            },
            {
                text: `1. Poor Media Quality:`,
            },
            {
                text: `    a. Good quality beads will wear evenly, maintaining their sphericity.`,
            },
            {
                text: `    b. Poorer quality beads, on the other hand, may wear into non-spherical shapes. This may have a detrimental effect on overall media wear rate but may also impact the wear rate of the IsaMill™ internal components.`,
            },
            {
                text: `    c. Poorer quality beads may also break, leaving shards of ceramic which can cause major wear to the internal components of the IsaMill™.`,
            },
            {
                text: `2. Media loss to the discharge stream. This will most commonly be caused by a combination of: high flow, high power draw (media load) and mill configuration. The following diagram explains the various factors affecting grinding media distribution.`,
            },
            {
                text: `3. Incorrect start up sequences: as the IsaMill shaft ramps up to full speed (~15 seconds, depending on mill size) media may exit through the discharge stream. Therefore it is important that the IsaMill™ is programmed to be in discharge recycle mode (recycle valve 100% open) during the motor start; the control logic is configured in this way as a standard.`,
            },
            {
                text: `4. Multiple different media types added to the IsaMill™; the hardest ceramic media will rapidly consume other media types.`,
            }
        ]
    },
    {
        title: 'What information is required to size an IsaMill™?',
        contents: [
            {
                text: `The following (minimum) information is required to size an IsaMill:`
            },
            {
                text: `\u2022 Maximum Throughput/Capacity.`,
            },
            {
                text: `\u2022 Feed Size, F80, (i.e. 80% passing size by weight)`,
            },
            {
                text: `\u2022 Target Product Size, P80, (i.e. 80% passing size by weight)`,
            },
            {
                text: `\u2022 Specific Energy Requirement for Size Reduction (kWh/t)`,
            },
            {
                text: `    o Calculated using a Signature Plot (generated at an accredited laboratory).`,
            },
            {
                text: `    o If data is unavailable, we can size from our signature plot database however a performance guarantee cannot be provided in these cases.`,
            },
            {
                text: `\u2022 Expected Feed Slurry Density`,
            },
            {
                text: `\u2022 Concentrate/Ore Specific Gravity`,
            },
            {
                text: `\u2022 Volumetric Flow rate at Design Tonnage (calculated using above information)`,
            },
            {
                text: `We prefer that the following information is included`,
            },
            {
                text: `\u2022 Application, e.g. leaching, flotation, re-grinding etc.`,
            },
            {
                text: `\u2022 Flow sheet Description`,
            },
            {
                text: `\u2022 Mineralogy of Concentrate/Ore`,
            },
            {
                text: `\u2022 Has any previous grinding test work been conducted?`,
            },
            {
                text: `Note that all data provided by the client is used in IsaMill™ sizings, no factors or corrections are required.`,
            },
        ]
    },
    {
        title: 'What could be causing high vibration?',
        contents: [
            {
                text: `As a standard, the IsaMill™ vibration is measured at the non-drive end (NDE) Bearing. The IsaMill™ motor is generally set to trip on high vibration when this value exceeds 6mm/s. If the vibration is consistently >2mm/s, it is worth investigating. The following steps should be followed to troubleshoot high vibration readings:`
            },
            {
                text: `\u2022 Ensure that there is not a build-up of coarse particles within the IsaMill™. If sufficiently coarse, particles entering the mill and building up inside may begin to act as grinding media, increasing the mill power draw and eventually overcharging the mill. This can cause the charge to lock, leading to high vibration.`,
            },
            {
                text: `\u2022 Check the vibration sensor on the NDE bearing to ensure it is secure and not providing false data.`,
            },
            {
                text: `\u2022 Ensure the shell liner is not loose in the shell. If there is vibration from the shell liner moving, rubber straps will need to be installed to keep it in place.`,
            },
            {
                text: `\u2022 Check that the wheels of the IsaMill™ have not come loose from the rails, if so these will need to be tightened.`,
            },
            {
                text: `\u2022 Conduct vibrational monitoring of the bearings to determine the frequency of the vibration, this may indicate a mechanical fault with the bearing.`,
            },
        ]
    },
    {
        title: 'Why is the IsaMill™ Power Draw Erratic (irregular drops and jumps)?',
        contents: [
            {
                text: `If the power draw is varying erratically, check the following:`
            },
            {
                text: `\u2022 Feed Density – Generally power draw increases with slurry density. Is the density within normal operating range?`,
            },
            {
                text: `\u2022 Viscosity – If the IsaMill’s internal viscosity has become too high, the power draw may drop quite dramatically due to “free-wheeling”.`,
            },
            {
                text: `\u2022 IsaMill™ Feed Flowrate – If the mill feed flowrate is too high, there is potential for media loss to the mill discharge stream. Media in the rotor area will cause an increase in power draw, until media begins to pass into the discharge stream. Is the flowrate within normal operating range?`,
            },
            {
                text: `\u2022 Media Charge – If the media hopper underneath the IsaMill™ is empty, then the IsaCharger system will continue to operate but no media will actually be entering the mill.`,
            },
            {
                text: `\u2022 Media Distribution – Media in the rotor area may cause the IsaMill™ Main Motor to draw more power.`,
            },
            {
                text: `\u2022 Coarse Particle Build-Up – Has the IsaMill™ circuit feed coarsened significantly?`,
            },
            {
                text: `\u2022 Sump-Pump Operation – If the IsaMill™ area sump pump is started, any media residing in the bund may be pumped into the feed pumpbox and subsequently the IsaMill™, resulting in increased media load and therefore power draw.`,
            },
        ]
    },
    {
        title: 'Why is the IsaCharger™ System not adding grinding media?',
        contents: [
            {
                text: `The IsaCharger™ System is usually set up to run automatically when required to maintain the desired IsaMill™ Power draw set-point. The automated Media Top-Up sequence will not run (or if it is already running, will cease to operate) in the following situations:`
            },
            {
                text: `\u2022 Power draw is close to set-point – To prevent overshooting, the sequence will stop once it gets close to its set-point (the offset is usually 10-50kW, depending on IsaMill™ size).`,
            },
            {
                text: `\u2022 IsaMill™ Feed Flowrate is too low – To prevent media settling and causing a blockage in the feed line.`,
            },
            {
                text: `\u2022 IsaCharger™ Water Flowrate is too low – To prevent media settling and causing a blockage in the IsaCharger™ delivery line.`,
            },
            {
                text: `\u2022 IsaMill™ Feed Density is too low – To prevent overshooting the power draw target. If the power draw target is reached at a low feed density, it will be exceeded once the density increases back to its set-point.`,
            },
            {
                text: `If the IsaCharger™ System is running but the IsaMill™ Power Draw is not rising, check the following:`,
            },
            {
                text: `\u2022 Is there media going into the IsaMill™ feed pumpbox?`,
            },
            {
                text: `\u2022 Is there media in the hopper?`,
            },
            {
                text: `\u2022 Is the IsaCharger™ Media Valve opened?`,
            },
            {
                text: `\u2022 Is the IsaCharger™ water pressure healthy (i.e. >500kPa)?`,
            },
            {
                text: `\u2022 Is there solidified slurry in the media hopper? If media is often dumped during operation, slurry may build-up and solidify in the media hopper. This may eventually lead to a complete blockage (media will no longer flow into the IsaCharger™).`,
            },
            {
                text: `\u2022 Is there media in the discharge stream? This will only be a consideration when the mill is nearly full, in which case new media entering the mill will displace existing media out of the discharge.`,
            },
        ]
    },
    {
        title: 'The drain/scuttle valve is open but media is not draining from the IsaMill™ (or is draining out very slowly).',
        contents: [
            {
                text: `The most likely reason for this issue is that the scuttle valve is not opening fully; incomplete actuation of this valve is generally caused by media getting stuck behind the scuttle plug, see image below.`
            },
            {
                img: require('./images/8.png')
            },
            {
                text: `Media behind the scuttle plug is generally symptomatic of dumping media on the run (scuttling media out of the mill at any time other than a maintenance shut down, i.e. during slurry operation). This occurs when an attempt is made to close the valve while media is rushing past it, when the mill has not yet fully emptied.`,
            },
            {
                text: `Check mill feed flowrate and pressure; if these are too low, there may be insufficient force to pump the media out of the scuttle.`,
            }
        ]
    },
    {
        title: 'Maintenance Frequency – How often do I need to open the IsaMill™ for inspection?',
        contents: [
            {
                text: `Inspection frequency should be optimised based on your own specific wear rates to (a) maximise component life and/or (b) minimise downtime. Most operations however sit around the 500-600 hour mark between inspections. The IMIS App (a free maintenance monitoring tool) can be used to:`
            },
            {
                text: `\u2022 Record maintenance measurements and other key maintenance information`,
            },
            {
                text: `\u2022 Track short or long term wear rates`,
            },
            {
                text: `\u2022 Plan next scheduled shutdown according to these wear rates (once enough data has been generated).`,
            },
            {
                text: `For more information on IMIS, contact the following email addresses:`,
            },
            {
                text: `\u2022 IMIS@glencore.com.au`,
            },
            {
                text: `\u2022 IsaMill@glencore.com.au`,
            },
        ]
    },
]