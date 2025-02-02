'use strict';
let engStart = '';
class G36XIP extends BaseInstrument {

  //Aircraft State Saving by CaptMatto with help by WeptBurrito2749

  // @TODO Check if the aircraft is on the ground as this can cause issues when loading when flying and all your switches are off. It is race to see who wins, the floor or the pilot

  constructor() {
    super();

    //Set our variables and read from the DataStore whilst the sim is loading the flight
    var title = SimVar.GetSimVarValue("TITLE", "string");
    this.livery = title.replace(/\s+/g, '_');
    var active = 1;
    SetStoredData('G36XIP_STATE_ACTIVE_'+this.livery, active.toString());

    if (GetStoredData('G36XIP_STATE_ACTIVE_'+this.livery) == 1) {
      console.log('State Saving Enabled');


      //Brand new Aircraft that has had a 45min acceptance flight & 30 minute flight checks prior to ownership
      //var resetHours = 1.25;
      //DeleteStoredData('G36XIP_HOBBS_'+this.livery);
      //SetStoredData('G36XIP_HOBBS_'+this.livery, resetHours.toString());
      this.hobbs = GetStoredData('G36XIP_HOBBS_'+this.livery) ? GetStoredData('G36XIP_HOBBS_'+this.livery) : 1.25;
      console.log(this.hobbs);
      if (this.hobbs == 1.25) {
        var startHours = 1.25;
        SetStoredData('G36XIP_HOBBS_'+this.livery, startHours.toString());
      }

      //Set my birthday
      var now = moment();
      //var date = '2021-09-04';
      //console.log(date)
      //SetStoredData('G36XIP_BIRTHDAY_'+this.livery, date.toString());
      this.birthday = GetStoredData('G36XIP_BIRTHDAY_'+this.livery) ? GetStoredData('G36XIP_BIRTHDAY_'+this.livery) : moment(now).format("YYYY-MM-DD");

      //DISTANCE TRAVELLED
      //var resetMiles = 5418;
      //SetStoredData('G36XIP_DISTANCE_FLOWN'+this.livery, resetMiles.toString());
      this.flown = GetStoredData('G36XIP_DISTANCE_FLOWN'+this.livery) ? GetStoredData('G36XIP_DISTANCE_FLOWN'+this.livery) : 25;
      if (this.flown == 25) {
        var startMiles = 1.25
        SetStoredData('G36XIP_DISTANCE_FLOWN'+this.livery, startMiles.toString());
      }


      //FUEL IN GALLONS AND WEIGHTS IN KG
      this.leftFuel = GetStoredData('G36XIP_LEFT_FUEL_'+this.livery) ? GetStoredData('G36XIP_LEFT_FUEL_'+this.livery) : 32; // See JuiceBox7535 post #1825 in main forum
      this.rightFuel = GetStoredData('G36XIP_RIGHT_FUEL_'+this.livery) ? GetStoredData('G36XIP_RIGHT_FUEL_'+this.livery) : 32;
      if (this.leftFuel == 32 || this.rightFuel == 32) {
        var setDefaultFuel = 32;
        SetStoredData('G36XIP_LEFT_FUEL_'+this.livery, setDefaultFuel.toString());
        SetStoredData('G36XIP_RIGHT_FUEL_'+this.livery, setDefaultFuel.toString());
      }



      this.pilotWeight = GetStoredData('G36XIP_PILOT_WEIGHT_'+this.livery) ? GetStoredData('G36XIP_PILOT_WEIGHT_'+this.livery) : 89; //Average male weight
      this.coPilotWeight = GetStoredData('G36XIP_COPILOT_WEIGHT_'+this.livery) ? GetStoredData('G36XIP_COPILOT_WEIGHT_'+this.livery) : 89; //Average male weight
      this.frontPaxLeft = GetStoredData('G36XIP_FRONT_LEFT_PAX_WEIGHT_'+this.livery) ? GetStoredData('G36XIP_FRONT_LEFT_PAX_WEIGHT_'+this.livery) : 0;
      this.frontPaxRight = GetStoredData('G36XIP_FRONT_RIGHT_PAX_WEIGHT_'+this.livery) ? GetStoredData('G36XIP_FRONT_RIGHT_PAX_WEIGHT_'+this.livery) : 0;
      this.rearPaxLeft = GetStoredData('G36XIP_REAR_LEFT_PAX_WEIGHT_'+this.livery) ? GetStoredData('G36XIP_REAR_LEFT_PAX_WEIGHT_'+this.livery) : 0;
      this.rearPaxRight = GetStoredData('G36XIP_REAR_RIGHT_PAX_WEIGHT_'+this.livery) ? GetStoredData('G36XIP_REAR_RIGHT_PAX_WEIGHT_'+this.livery) : 0;
      this.baggage = GetStoredData('G36XIP_BAGGAGE_WEIGHT_'+this.livery) ? GetStoredData('G36XIP_BAGGAGE_WEIGHT_'+this.livery) : 0;

      //SWITCHES
      this.bat1 = GetStoredData('G36XIP_BAT1_'+this.livery) ? GetStoredData('G36XIP_BAT1_'+this.livery) : 0;
      this.bat2 = GetStoredData('G36XIP_BAT2_'+this.livery) ? GetStoredData('G36XIP_BAT2_'+this.livery) : 0;
      this.alt1 = GetStoredData('G36XIP_ALT1_'+this.livery) ? GetStoredData('G36XIP_ALT1_'+this.livery) : 0;
      this.alt2 = GetStoredData('G36XIP_ALT2_'+this.livery) ? GetStoredData('G36XIP_ALT2_'+this.livery) : 0;
      this.pBrake = GetStoredData('G36XIP_PBRAKE_'+this.livery) ? GetStoredData('G36XIP_PBRAKE_'+this.livery) : 1; //Because you should always have your parking brake set
      this.avionics = GetStoredData('G36XIP_AVIONICS_'+this.livery) ? GetStoredData('G36XIP_AVIONICS_'+this.livery) : 0;
      this.aircon = GetStoredData('G36XIP_AIRCO_'+this.livery) ? GetStoredData('G36XIP_AIRCO_'+this.livery) : 0;
      this.blower = GetStoredData('G36XIP_BLOWER_'+this.livery) ? GetStoredData('G36XIP_BLOWER_'+this.livery) : 0;
      this.ventBlower = GetStoredData('G36XIP_VENT_BLOWER_'+this.livery) ? GetStoredData('G36XIP_VENT_BLOWER_'+this.livery) : 0;
      this.auxFuelPump = GetStoredData('G36XIP_AUX_FUEL_PUMP_'+this.livery) ? GetStoredData('G36XIP_AUX_FUEL_PUMP_'+this.livery) : 0;
      this.magnetoLeft = GetStoredData('G36XIP_MAGNETO_LEFT_'+this.livery) ? GetStoredData('G36XIP_MAGNETO_LEFT_'+this.livery) : 0;
      this.magnetoRight = GetStoredData('G36XIP_MAGNETO_RIGHT_'+this.livery) ? GetStoredData('G36XIP_MAGNETO_RIGHT_'+this.livery) : 0;
      this.pitotHeat = GetStoredData('G36XIP_PITOT_'+this.livery) ? GetStoredData('G36XIP_PITOT_'+this.livery) : 0;
      this.propDeIce = GetStoredData('G36XIP_PROP_DEICE_'+this.livery) ? GetStoredData('G36XIP_PROP_DEICE_'+this.livery) : 0;
      this.strobe = GetStoredData('G36XIP_STROBE_'+this.livery) ? GetStoredData('G36XIP_STROBE_'+this.livery) : 0;
      this.beacon = GetStoredData('G36XIP_BEACON_'+this.livery) ? GetStoredData('G36XIP_BEACON_'+this.livery) : 0;
      this.navLight = GetStoredData('G36XIP_NAV_LIGHT_'+this.livery) ? GetStoredData('G36XIP_NAV_LIGHT_'+this.livery) : 0;
      this.floodLight = GetStoredData('G36XIP_FLOOD_LIGHT_'+this.livery) ? GetStoredData('G36XIP_FLOOD_LIGHT_'+this.livery) : 0;
      this.panelLight = GetStoredData('G36XIP_PANEL_LIGHT_'+this.livery) ? GetStoredData('G36XIP_PANEL_LIGHT_'+this.livery) : 0;
      this.taxiLight = GetStoredData('G36XIP_TAXI_LIGHT_'+this.livery) ? GetStoredData('G36XIP_TAXI_LIGHT_'+this.livery) : 0;
      this.landingLight = GetStoredData('G36XIP_LANDING_LIGHT_'+this.livery) ? GetStoredData('G36XIP_LANDING_LIGHT_'+this.livery) : 0;
      this.fuelSelector = GetStoredData('G36XIP_FUEL_SELECT_'+this.livery) ? GetStoredData('G36XIP_FUEL_SELECT_'+this.livery) : 0; //0=OFF, 2=LEFT TANK, 3=RIGHT TANK
      this.defrost = GetStoredData('G36XIP_DEFROST_'+this.livery) ? GetStoredData('G36XIP_DEFROST_'+this.livery) : 0;

      //LEAVERS IN PERCENT %
      this.throttle = GetStoredData('G36XIP_THROTTLE_'+this.livery) ? GetStoredData('G36XIP_THROTTLE_'+this.livery) : 0;
      this.prop = GetStoredData('G36XIP_PROP_'+this.livery) ? GetStoredData('G36XIP_PROP_'+this.livery) : 0;
      this.mixture = GetStoredData('G36XIP_MIXTURE_'+this.livery) ? GetStoredData('G36XIP_MIXTURE_'+this.livery) : 0;
      this.cowl = GetStoredData('G36XIP_COWL_'+this.livery) ? GetStoredData('G36XIP_COWL_'+this.livery) : 0;

      //FLIGHT CONTROLS
      this.flapsSwitch = GetStoredData('G36XIP_FLAPS_SWITCH_'+this.livery) ? GetStoredData('G36XIP_FLAPS_SWITCH_'+this.livery) : 0; // 0=UP, 1=APPR, 2=FULL DOWN
      this.flapsLeft = GetStoredData('G36XIP_FLAPS_LEFT_'+this.livery) ? GetStoredData('G36XIP_FLAPS_LEFT_'+this.livery) : 0; // UP=0, APPR=40, DOWN=100
      this.flapsRight = GetStoredData('G36XIP_FLAPS_RIGHT_'+this.livery) ? GetStoredData('G36XIP_FLAPS_RIGHT'+this.livery) : 0; // UP=0, APPR=40, DOWN=100

      this.pitchTrim = GetStoredData('G36XIP_PITCH_TRIM_'+this.livery) ? GetStoredData('G36XIP_PITCH_TRIM_'+this.livery) : 0;
      this.aileronTrim = GetStoredData('G36XIP_AILERON_TRIM_'+this.livery) ? GetStoredData('G36XIP_AILERON_TRIM_'+this.livery) : 0;

      //KNOBS
      this.floodBrightness = GetStoredData('G36XIP_FLOOD_BRIGHTNESS_'+this.livery) ? GetStoredData('G36XIP_FLOOD_BRIGHTNESS_'+this.livery) : 0;

      //MISC
      this.yokeLeft = GetStoredData('G36XIP_YOKE_LEFT_'+this.livery) ? GetStoredData('G36XIP_YOKE_LEFT_'+this.livery) : 0;
      this.yoke2Right = GetStoredData('G36XIP_YOKE_RIGHT_'+this.livery) ? GetStoredData('G36XIP_YOKE_RIGHT_'+this.livery) : 0;

      //MODELLING STUFF

      //SPARKS
      this.spark1 = GetStoredData('G36XIP_SPARK_1_LIKELIHOOD_'+this.livery) ? Math.random() : Math.random();
      this.spark3 = GetStoredData('G36XIP_SPARK_3_LIKELIHOOD_'+this.livery) ? Math.random() : Math.random();
      this.spark5 = GetStoredData('G36XIP_SPARK_5_LIKELIHOOD_'+this.livery) ? Math.random() : Math.random();
      this.spark7 = GetStoredData('G36XIP_SPARK_7_LIKELIHOOD_'+this.livery) ? Math.random() : Math.random();
      this.spark9 = GetStoredData('G36XIP_SPARK_9_LIKELIHOOD_'+this.livery) ? Math.random() : Math.random();
      this.spark11 = GetStoredData('G36XIP_SPARK_11_LIKELIHOOD_'+this.livery) ? Math.random() : Math.random();

    }


  }

  //load the gauge template - found in G36XIP.HTML
  get templateID() { return 'G36XIP'; }

  //Runs as the sim is loading
  connectedCallback() {
    console.log('connectedCallback');
    super.connectedCallback();
  } //end connectedCallback

  //Runs once the flight is loaded
  onFlightStart() {
    console.log('onFlightStart');
    super.onFlightStart();


    if (GetStoredData('G36XIP_STATE_ACTIVE_'+this.livery) == 1) {

      //FLIGHT STATES ON LOAD

      //Parked
      if (SimVar.GetSimVarValue("ATC ON PARKING SPOT", "bool") == 1) {
        //The aircraft is on the ground and parked, we can load all the variables

        //load fuel
        SimVar.SetSimVarValue("FUEL TANK LEFT MAIN QUANTITY", "gallons", Number(this.leftFuel));
        SimVar.SetSimVarValue("FUEL TANK RIGHT MAIN QUANTITY", "gallons", Number(this.rightFuel));
        //Fuel Selector
        SimVar.SetSimVarValue("K:FUEL_SELECTOR_SET", "number", Number(this.fuelSelector));
        //Parking Brake
        SimVar.SetSimVarValue("K:PARKING_BRAKES", "number", Number(this.pBrake));
        //Battery 1
        SimVar.SetSimVarValue("ELECTRICAL MASTER BATTERY:1", "number", Number(this.bat1));
        //Battery 2
        SimVar.SetSimVarValue("ELECTRICAL MASTER BATTERY:2", "number", Number(this.bat2));
        //Alternator 1
        if (this.alt1 == 1 && SimVar.GetSimVarValue("GENERAL ENG MASTER ALTERNATOR:1", "bool") == 0) {
          SimVar.SetSimVarValue("K:TOGGLE_ALTERNATOR1", "number", 1);
        }
        //Alternator 2
        if (this.alt2 == 1 && SimVar.GetSimVarValue("GENERAL ENG MASTER ALTERNATOR:2", "bool") == 0) {
          SimVar.SetSimVarValue("K:TOGGLE_ALTERNATOR2", "number", 1); //Works
        }
        //Avionics Switch
        SimVar.SetSimVarValue("K:AVIONICS_MASTER_SET", "number", Number(this.avionics));
        //Airconditioning
        SimVar.SetSimVarValue("L:XMLVAR_Airco", "number", Number(this.aircon));
        //Blower
        SimVar.SetSimVarValue("L:XMLVAR_Blower", "number", Number(this.blower));
        //Vent Blower
        SimVar.SetSimVarValue("L:XMLVAR_Vent", "number", Number(this.ventBlower));
        //Fuel Pump Switch
        SimVar.SetSimVarValue("K:ELECT_FUEL_PUMP1_SET", "bool", Number(this.auxFuelPump));
        //Magnetos
        SimVar.SetSimVarValue("RECIP ENG LEFT MAGNETO:1", "bool", Number(this.magnetoLeft));
        SimVar.SetSimVarValue("RECIP ENG RIGHT MAGNETO:1", "bool", Number(this.magnetoRight));
        //Pitot Heat
        SimVar.SetSimVarValue("K:PITOT_HEAT_SET", "number", Number(this.pitotHeat));
        //Prop De-Ice
        if (GetStoredData('G36XIP_PROP_DEICE_'+this.livery) == 1 && SimVar.GetSimVarValue("PROP DEICE SWITCH:1", "bool") == 0) {
          SimVar.SetSimVarValue("B:DEICE_Propeller_1_Toggle", "number", 1);
        }
        //Strobe
        SimVar.SetSimVarValue("LIGHT STROBE", "bool", Number(this.strobe)); //Works
        //Beacon
        SimVar.SetSimVarValue("LIGHT BEACON", "bool", Number(this.beacon)); //Works
        //Nav
        SimVar.SetSimVarValue("LIGHT NAV", "bool", Number(this.navLight)); //Works
        //Panel FLood
        SimVar.SetSimVarValue("LIGHT GLARESHIELD", "bool", Number(this.floodLight)); //Works
        //Panel Light
        SimVar.SetSimVarValue("LIGHT PANEL", "bool", Number(this.panelLight)); //Works
        //Taxi Light
        SimVar.SetSimVarValue("LIGHT TAXI", "bool", Number(this.taxiLight)); //Works
        //Landing Light
        SimVar.SetSimVarValue("LIGHT LANDING", "bool", Number(this.landingLight)); //Works
        //Throttle
        SimVar.SetSimVarValue("GENERAL ENG THROTTLE LEVER POSITION:1", "percent", Number(this.throttle)); //Works
        //Prop
        SimVar.SetSimVarValue("GENERAL ENG PROPELLER LEVER POSITION:1", "percent", Number(this.prop)); //Works
        //Mixture
        SimVar.SetSimVarValue("GENERAL ENG MIXTURE LEVER POSITION:1", "percent", Number(this.mixture)); //Works
        //Flaps
        SimVar.SetSimVarValue("FLAPS HANDLE INDEX", "number", Number(this.flapsSwitch)); //Works
        SimVar.SetSimVarValue("TRAILING EDGE FLAPS LEFT PERCENT", "percent", Number(this.flapsLeft)); //Works
        SimVar.SetSimVarValue("TRAILING EDGE FLAPS RIGHT PERCENT", "percent", Number(this.flapsRight)); //Works
        //Avionics Brightness
          //pot14

        //floodlight brightness
          //pot5

        //Panel light brightness
          //pot3

        //Sub Panel Lighting brightness
          //pot2

        //Defrost
        SimVar.SetSimVarValue("K:ANTI_ICE_GRADUAL_SET_ENG1", "position 16k", Number(this.defrost));

        //Alieron Trim
        SimVar.SetSimVarValue("AILERON TRIM PCT", "Percent Over 100", Number(this.aileronTrim));

        //Cowl Flaps
        SimVar.SetSimVarValue("RECIP ENG COWL FLAP POSITION:1", "percent", Number(this.cowl)); //Works

        //Pitch trim
        SimVar.SetSimVarValue("ELEVATOR TRIM POSITION", "radians", Number(this.pitchTrim));

        //Yoke visibility
        SimVar.SetSimVarValue("L:XMLVAR_YokeHidden1", "number", Number(this.yoke1));
        SimVar.SetSimVarValue("L:XMLVAR_YokeHidden2", "number", Number(this.yoke2));

        //Spark Fouling Likelihood
        SimVar.SetSimVarValue("L:G36XIP_SPARK_1_LIKELIHOOD", "number", Number(this.spark1));
        SimVar.SetSimVarValue("L:G36XIP_SPARK_3_LIKELIHOOD", "number", Number(this.spark3));
        SimVar.SetSimVarValue("L:G36XIP_SPARK_5_LIKELIHOOD", "number", Number(this.spark5));
        SimVar.SetSimVarValue("L:G36XIP_SPARK_7_LIKELIHOOD", "number", Number(this.spark7));
        SimVar.SetSimVarValue("L:G36XIP_SPARK_9_LIKELIHOOD", "number", Number(this.spark9));
        SimVar.SetSimVarValue("L:G36XIP_SPARK_11_LIKELIHOOD", "number", Number(this.spark11));

      }

      //On Ground but not in a parking space, probably on the runway
      if (SimVar.GetSimVarValue("SIM ON GROUND", "bool") == 1 && SimVar.GetSimVarValue("ATC ON PARKING SPOT", "bool") == 0) {
        //The aircraft is on the ground AND not in a parking spot, so most probably on the runway, we want to check if the engine is running
        if (SimVar.GetSimVarValue("ENG COMBUSTION:1", "bool") == 1) {
          //engine is running don't override the sim settings

        } else {
          //engine off set everything

          //load fuel
          SimVar.SetSimVarValue("FUEL TANK LEFT MAIN QUANTITY", "gallons", Number(this.leftFuel));
          SimVar.SetSimVarValue("FUEL TANK RIGHT MAIN QUANTITY", "gallons", Number(this.rightFuel));
          //Fuel Selector
          SimVar.SetSimVarValue("K:FUEL_SELECTOR_SET", "number", Number(this.fuelSelector));
          //Parking Brake
          SimVar.SetSimVarValue("K:PARKING_BRAKES", "number", Number(this.pBrake));
          //Battery 1
          SimVar.SetSimVarValue("ELECTRICAL MASTER BATTERY:1", "number", Number(this.bat1));
          //Battery 2
          SimVar.SetSimVarValue("ELECTRICAL MASTER BATTERY:2", "number", Number(this.bat2));
          //Alternator 1
          if (this.alt1 == 1 && SimVar.GetSimVarValue("GENERAL ENG MASTER ALTERNATOR:1", "bool") == 0) {
            SimVar.SetSimVarValue("K:TOGGLE_ALTERNATOR1", "number", 1); //Works
          }
          //Alternator 2
          if (this.alt2 == 1 && SimVar.GetSimVarValue("GENERAL ENG MASTER ALTERNATOR:2", "bool") == 0) {
            SimVar.SetSimVarValue("K:TOGGLE_ALTERNATOR2", "number", 1); //Works
          }
          //Avionics Switch
          SimVar.SetSimVarValue("K:AVIONICS_MASTER_SET", "number", Number(this.avionics));
          //Airconditioning
          SimVar.SetSimVarValue("L:XMLVAR_Airco", "number", Number(this.aircon));
          //Blower
          SimVar.SetSimVarValue("L:XMLVAR_Blower", "number", Number(this.blower));
          //Vent Blower
          SimVar.SetSimVarValue("L:XMLVAR_Vent", "number", Number(this.ventBlower));
          //Fuel Pump Switch
          SimVar.SetSimVarValue("K:ELECT_FUEL_PUMP1_SET", "bool", Number(this.auxFuelPump));
          //Magnetos
          SimVar.SetSimVarValue("RECIP ENG LEFT MAGNETO:1", "bool", Number(this.magnetoLeft));
          SimVar.SetSimVarValue("RECIP ENG RIGHT MAGNETO:1", "bool", Number(this.magnetoRight));
          //Pitot Heat
          SimVar.SetSimVarValue("K:PITOT_HEAT_SET", "number", Number(this.pitotHeat));
          //Prop De-Ice
          if (GetStoredData('G36XIP_PROP_DEICE_'+this.livery) == 1 && SimVar.GetSimVarValue("PROP DEICE SWITCH:1", "bool") == 0) {
            SimVar.SetSimVarValue("B:DEICE_Propeller_1_Toggle", "number", 1);
          }
          //Strobe
          SimVar.SetSimVarValue("LIGHT STROBE", "bool", Number(this.strobe)); //Works
          //Beacon
          SimVar.SetSimVarValue("LIGHT BEACON", "bool", Number(this.beacon)); //Works
          //Nav
          SimVar.SetSimVarValue("LIGHT NAV", "bool", Number(this.navLight)); //Works
          //Panel FLood
          SimVar.SetSimVarValue("LIGHT GLARESHIELD", "bool", Number(this.floodLight)); //Works
          //Panel Light
          SimVar.SetSimVarValue("LIGHT PANEL", "bool", Number(this.panelLight)); //Works
          //Taxi Light
          SimVar.SetSimVarValue("LIGHT TAXI", "bool", Number(this.taxiLight)); //Works
          //Landing Light
          SimVar.SetSimVarValue("LIGHT LANDING", "bool", Number(this.landingLight)); //Works
          //Throttle
          SimVar.SetSimVarValue("GENERAL ENG THROTTLE LEVER POSITION:1", "percent", Number(this.throttle)); //Works
          //Prop
          SimVar.SetSimVarValue("GENERAL ENG PROPELLER LEVER POSITION:1", "percent", Number(this.prop)); //Works
          //Mixture
          SimVar.SetSimVarValue("GENERAL ENG MIXTURE LEVER POSITION:1", "percent", Number(this.mixture)); //Works
          //Flaps
          SimVar.SetSimVarValue("FLAPS HANDLE INDEX", "number", Number(this.flapsSwitch)); //Works
          SimVar.SetSimVarValue("TRAILING EDGE FLAPS LEFT PERCENT", "percent", Number(this.flapsLeft)); //Works
          SimVar.SetSimVarValue("TRAILING EDGE FLAPS RIGHT PERCENT", "percent", Number(this.flapsRight)); //Works
          //Avionics Brightness
            //pot14

          //floodlight brightness
            //pot5

          //Panel light brightness
            //pot3

          //Sub Panel Lighting brightness
            //pot2

          //Defrost
          SimVar.SetSimVarValue("K:ANTI_ICE_GRADUAL_SET_ENG1", "position 16k", Number(this.defrost));

          //Alieron Trim
          SimVar.SetSimVarValue("AILERON TRIM PCT", "Percent Over 100", Number(this.aileronTrim));

          //Cowl Flaps
          SimVar.SetSimVarValue("RECIP ENG COWL FLAP POSITION:1", "percent", Number(this.cowl)); //Works

          //Pitch trim
          SimVar.SetSimVarValue("ELEVATOR TRIM POSITION", "radians", Number(this.pitchTrim));

          //Yoke visibility
          SimVar.SetSimVarValue("L:XMLVAR_YokeHidden1", "number", Number(this.yoke1));
          SimVar.SetSimVarValue("L:XMLVAR_YokeHidden2", "number", Number(this.yoke2));
        }
      }

      //In the Air
      if (SimVar.GetSimVarValue("SIM ON GROUND", "bool") == 0) {
        //We're in the air, don't set anything or we'll plumet to the ground
      }

    }


    var timerMilSecs = 1000;

    if (GetStoredData('G36XIP_STATE_ACTIVE_'+this.livery) == 1) {
      var timer = window.setInterval(checkG36State, timerMilSecs);
    }

    function checkG36State() {

      var title = SimVar.GetSimVarValue("TITLE", "string");
      var planeId = title.replace(/\s+/g, '_');

      //if (SimVar.GetSimVarValue("SIM ON GROUND", "bool") == 1 && SimVar.GetSimVarValue("ENG COMBUSTION:1", "bool") == 0) {

        //FUEL IN GALLONS AND WEIGHTS IN KG
          let lefttank = SimVar.GetSimVarValue("FUEL TANK LEFT MAIN QUANTITY", "gallons");
          let righttank = SimVar.GetSimVarValue("FUEL TANK RIGHT MAIN QUANTITY", "gallons");
          SetStoredData('G36XIP_LEFT_FUEL_'+planeId, lefttank.toString());
          SetStoredData('G36XIP_RIGHT_FUEL_'+planeId, righttank.toString());
        //SWITCHES
          //Battery switches
          var bat1 = SimVar.GetSimVarValue("ELECTRICAL MASTER BATTERY:1", "bool");
          var bat2 = SimVar.GetSimVarValue("ELECTRICAL MASTER BATTERY:2", "bool");
          SetStoredData('G36XIP_BAT1_'+planeId, bat1.toString());
          SetStoredData('G36XIP_BAT2_'+planeId, bat2.toString());
          //Alternator switches
          var alt1 = SimVar.GetSimVarValue("GENERAL ENG MASTER ALTERNATOR:1", "bool");
          var alt2 = SimVar.GetSimVarValue("GENERAL ENG MASTER ALTERNATOR:2", "bool");
      		SetStoredData('G36XIP_ALT1_'+planeId, alt1.toString());
      		SetStoredData('G36XIP_ALT2_'+planeId, alt2.toString());
          //Parking Brake
          var pBrake = SimVar.GetSimVarValue("BRAKE PARKING INDICATOR", "bool");
          SetStoredData('G36XIP_PBRAKE_'+planeId, pBrake.toString());
          //Avionics
          var avionics = SimVar.GetSimVarValue("AVIONICS MASTER SWITCH", "bool");
          SetStoredData('G36XIP_AVIONICS_'+planeId, avionics.toString());
          //Aircon
          var aircon = SimVar.GetSimVarValue("L:XMLVAR_Airco", "number");
          SetStoredData('G36XIP_AIRCON_'+planeId, aircon.toString());
          //Blower
          var blower = SimVar.GetSimVarValue("L:XMLVAR_Blower", "number");
          SetStoredData('G36XIP_BLOWER_'+planeId, blower.toString());
          //Vent Blower
          var ventBlower = SimVar.GetSimVarValue("L:XMLVAR_Vent", "number");
          SetStoredData('G36XIP_VENT_BLOWER_'+planeId, ventBlower.toString());
          //Aux Fuel Pump
          var auxFuelPump = SimVar.GetSimVarValue("GENERAL ENG FUEL PUMP SWITCH:1", "bool");
          SetStoredData('G36XIP_AUX_FUEL_PUMP_'+planeId, auxFuelPump.toString());
          //Left Mag
          var magnetoL = SimVar.GetSimVarValue("RECIP ENG LEFT MAGNETO:1", "bool");
      		SetStoredData('G36XIP_MAGNETO_LEFT_'+planeId, magnetoL.toString());
          //Right Mag
          var magnetoR = SimVar.GetSimVarValue("RECIP ENG RIGHT MAGNETO:1", "bool");
          SetStoredData('G36XIP_MAGNETO_RIGHT_'+planeId, magnetoR.toString());
          //Pitot Heat
          var pitotHeat = SimVar.GetSimVarValue("L:DEICE_Pitot_1", "number");
      		SetStoredData('G36XIP_PITOT_'+planeId, pitotHeat.toString());
          //Prop De-Ice
          var propDeIce = SimVar.GetSimVarValue("PROP DEICE SWITCH:1", "bool");
      		SetStoredData('G36XIP_PROP_DEICE_'+planeId, propDeIce.toString());
          //Strobe
          var strobe = SimVar.GetSimVarValue("LIGHT STROBE", "bool");
          SetStoredData('G36XIP_STROBE_'+planeId, strobe.toString());
          //Beacon
          var beacon = SimVar.GetSimVarValue("LIGHT BEACON", "bool");
          SetStoredData('G36XIP_BEACON_'+planeId, beacon.toString());
          //NavLight
          var navLight = SimVar.GetSimVarValue("LIGHT NAV", "bool");
          SetStoredData('G36XIP_NAV_LIGHT_'+planeId, navLight.toString());
          //Flood Light
          var floodLight = SimVar.GetSimVarValue("LIGHT GLARESHIELD", "bool");
          SetStoredData('G36XIP_FLOOD_LIGHT_'+planeId, floodLight.toString());
          //Panel Light
          var panelLight = SimVar.GetSimVarValue("LIGHT PANEL", "bool");
      		SetStoredData('G36XIP_PANEL_LIGHT_'+planeId, panelLight.toString());
          //Taxi Light
          var taxiLight = SimVar.GetSimVarValue("LIGHT TAXI", "bool");
          SetStoredData('G36XIP_TAXI_LIGHT_'+planeId, taxiLight.toString());
          //Landing Light
          var landingLight = SimVar.GetSimVarValue("LIGHT LANDING", "bool");
          SetStoredData('G36XIP_LANDING_LIGHT_'+planeId, landingLight.toString());
          //Fuel Selector
          var fuelSelector = SimVar.GetSimVarValue("RECIP ENG FUEL TANK SELECTOR:1", "Enum");
          SetStoredData('G36XIP_FUEL_SELECT_'+planeId, fuelSelector.toString());
          //Defrost
          var defrost = SimVar.GetSimVarValue("A:GENERAL ENG ANTI ICE POSITION:1", "position 16k");
          SetStoredData('G36XIP_DEFROST_'+planeId, defrost.toString());


        //LEAVERS IN PERCENT %

          //Throttle
          var throttle = SimVar.GetSimVarValue("GENERAL ENG THROTTLE LEVER POSITION:1", "percent");
          SetStoredData('G36XIP_THROTTLE_'+planeId, throttle.toString());
          //Propeller
          var prop = SimVar.GetSimVarValue("GENERAL ENG PROPELLER LEVER POSITION:1", "percent");
          SetStoredData('G36XIP_PROP_'+planeId, prop.toString());
          //Mixture
          var mixture = SimVar.GetSimVarValue("GENERAL ENG MIXTURE LEVER POSITION:1", "percent");
          SetStoredData('G36XIP_MIXTURE_'+planeId, mixture.toString());
          //Cowl Flaps
          var cowl = SimVar.GetSimVarValue("RECIP ENG COWL FLAP POSITION:1", "percent");
          SetStoredData('G36XIP_COWL_'+planeId, cowl.toString());

        //FLIGHT CONTROLS

          //Flaps Switch
          var flaps = SimVar.GetSimVarValue("FLAPS HANDLE INDEX", "number");
          SetStoredData('G36XIP_FLAPS_SWITCH_'+planeId, flaps.toString());
          var flapsLeft = SimVar.GetSimVarValue("TRAILING EDGE FLAPS LEFT PERCENT", "percent");
          SetStoredData('G36XIP_FLAPS_LEFT_'+planeId, flapsLeft.toString());
          var flapsRight = SimVar.GetSimVarValue("TRAILING EDGE FLAPS RIGHT PERCENT", "percent");
          SetStoredData('G36XIP_FLAPS_RIGHT_'+planeId, flapsRight.toString());

        //KNOBS

          //Flood Brightness
          var floodBrightness = SimVar.GetSimVarValue("LIGHT POTENTIOMETER:5", "percent");
          SetStoredData('G36XIP_FLOOD_BRIGHTNESS_'+planeId, floodBrightness.toString());

        //MISC
          var yoke1 = SimVar.GetSimVarValue("L:XMLVAR_YokeHidden1", "number");
          SetStoredData('G36XIP_YOKE1_'+planeId, yoke1.toString());
          var yoke2 = SimVar.GetSimVarValue("L:XMLVAR_YokeHidden2", "number");
          SetStoredData('G36XIP_YOKE2_'+planeId, yoke2.toString());

        //HOBBS
          var engStatus = SimVar.GetSimVarValue("ENG COMBUSTION:1", "bool");
          var preStart = GetStoredData('G36XIP_HOBBS_'+planeId);
          var hobbsStarter = GetStoredData('G36XIP_HOBBS_STARTER'+planeId);

          if (engStatus == 1 && hobbsStarter == 0) {
            engStart = moment();
            var hobbsStarter = 1;
            SetStoredData('G36XIP_HOBBS_STARTER'+planeId, hobbsStarter.toString());
          }

          if (engStatus == 0 && hobbsStarter == 1) {
            var now = moment();
            var duration = now.diff(engStart, 'hours', true);
            var total = Number(preStart) + Number(duration);
            SetStoredData('G36XIP_HOBBS_'+planeId, total.toString());
            var starter = 0;
            SetStoredData('G36XIP_HOBBS_STARTER'+planeId, starter.toString());
          }

        //DISTANCE MEASURING
          var simOnGround = SimVar.GetSimVarValue("SIM ON GROUND", "bool");
          var naughtySlewCheaters = SimVar.GetSimVarValue("IS SLEW ACTIVE", "bool");
          var currentMiles = GetStoredData('G36XIP_DISTANCE_FLOWN'+planeId);

          if (simOnGround == 0 && naughtySlewCheaters == 0) {
            var groundSpeed = SimVar.GetSimVarValue("GPS GROUND SPEED", "Meters per second");
            var travelled = Number(groundSpeed) * 0.00053995680345572;
            var newMiles = Number(currentMiles) + Number(travelled);
            SetStoredData('G36XIP_DISTANCE_FLOWN'+planeId, newMiles.toString());
          }

        //MODELLING STUFF

        if (SimVar.GetSimVarValue("L:G36XIP_FOUL", "bool")) {
          var fouling = 1;
          SetStoredData('G36XIP_PLUG_FOULING_'+planeId, fouling.toString());
        } else {
          var fouling = 0;
          SetStoredData('G36XIP_PLUG_FOULING_'+planeId, fouling.toString());
        }

        var spark1LK = SimVar.GetSimVarValue("L:G36XIP_SPARK_1_LIKELIHOOD", "number");
        SetStoredData('G36XIP_SPARK_1_LIKELIHOOD_'+planeId, spark1LK.toString());
        var spark3LK = SimVar.GetSimVarValue("L:G36XIP_SPARK_3_LIKELIHOOD", "number");
        SetStoredData('G36XIP_SPARK_3_LIKELIHOOD_'+planeId, spark3LK.toString());
        var spark5LK = SimVar.GetSimVarValue("L:G36XIP_SPARK_5_LIKELIHOOD", "number");
        SetStoredData('G36XIP_SPARK_5_LIKELIHOOD_'+planeId, spark5LK.toString());
        var spark7LK = SimVar.GetSimVarValue("L:G36XIP_SPARK_7_LIKELIHOOD", "number");
        SetStoredData('G36XIP_SPARK_7_LIKELIHOOD_'+planeId, spark7LK.toString());
        var spark9LK = SimVar.GetSimVarValue("L:G36XIP_SPARK_9_LIKELIHOOD", "number");
        SetStoredData('G36XIP_SPARK_9_LIKELIHOOD_'+planeId, spark9LK.toString());
        var spark11LK = SimVar.GetSimVarValue("L:G36XIP_SPARK_11_LIKELIHOOD", "number");
        SetStoredData('G36XIP_SPARK_11_LIKELIHOOD_'+planeId, spark11LK.toString());


    }
  } //End onFlightStart()

  //Runs every frame
  Update() {
    super.Update();
  }
}

registerInstrument('g36xip-element', G36XIP);