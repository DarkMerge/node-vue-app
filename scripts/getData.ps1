get-wmiobject -namespace "root/OpenHardwareMonitor" Hardware |
  Out-File -width 132 'temp/local-hardware-stats.txt' -Encoding 'UTF8';

get-wmiobject -namespace "root/OpenHardwareMonitor" Sensors |
  Out-File -width 132 'temp/local-sernsors-stats.txt' -Encoding 'UTF8';
