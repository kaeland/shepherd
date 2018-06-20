// Older method for rendering Drivers: 
  // renderDrivers() {
  //   const drivers = this.state.drivers;
  //   const church_id = this.props.match.params.church_id;
  //   const driversList = drivers.map((driver, index) => {
  //     const riders = [];
  //     const keys = Object.keys(driver);
  //     // Determine if riders exist in the drivers object
  //     if (keys.includes('riders')) {
  //       _.forEach(driver.riders, (value, key) => {
  //         const rider = {};
  //         const fullName = value.firstName + ' ' + value.lastName;
  //         rider.name = fullName;
  //         rider.id = key;
  //         riders.push(rider);
  //       });
  //     };
  //     // Return a list of drivers from Google Firebase
  //     return (
  //         <Panel key={driver.id} eventKey={index}>
  //           <Panel.Heading>
  //             <Panel.Title toggle >
  //               <div className="driver_header_wrapper">
  //                 <p>{driver.firstName} {driver.lastName}</p>
  //                 <div>
  //                   <Link to={`/drivers/${church_id}/add_rider/${driver.id}`} className="driver_header_button">Ride</Link>
  //                   <Link to={`/drivers/${church_id}/edit/${driver.id}`} className="driver_header_button">Edit</Link>
  //                   <p onClick={(e) => this.onDelete(driver.id, e)} className="driver_header_button delete-button">Delete Driver</p>
  //                 </div>
  //               </div>
  //             </Panel.Title>
  //           </Panel.Heading>
  //           <Panel.Body collapsible>
  //             <p>Seats Left: {driver.seatsAvailable}</p>
  //             <p>Riders: {_.isEmpty(riders) ? "There are no riders" : this.renderRiders(riders, church_id, driver.id)}</p>
  //           </Panel.Body>
  //         </Panel>
  //     );
  //   });
  //   return driversList;
  // }

// ChurchesPage render Version #1
  // renderChurches() {
  //   const churches = ['Blueprint', 'Conerstone', 'Gospel Hope'];
  //   const churchList = this.state.churches.map((church) => {
  //     return (
  //       <Panel key={church.id}>
  //         <Panel.Heading>
  //           <Panel.Title>
  //             <div className="driver_header_wrapper">
  //               <p style={{ marginTop: '10px' }}>{church.name}</p>
  //               <div>
  //                 <Link to={`/drivers/${church.id}`}>
  //                   <Button className="driver_header_button">Find Rides</Button>
  //                 </Link>
  //                 <Link to={`/edit/church/${church.id}`}>
  //                   <Button className="driver_header_button">Edit</Button>
  //                 </Link>
  //               </div>
  //             </div>
  //           </Panel.Title>
  //         </Panel.Heading>
  //       </Panel>
  //     );
  //   });
  //   return churchList;
  // }