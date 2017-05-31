get-wmiobject -namespace "root/OpenHardwareMonitor" Hardware | 
  Out-File -width 132 'static/local-hardware-stats.txt' -Encoding 'UTF8'
